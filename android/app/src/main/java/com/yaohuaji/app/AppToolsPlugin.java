package com.yaohuaji.app;

import android.app.AlarmManager;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.PendingIntent;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Context;
import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.net.Uri;
import android.os.Build;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Base64;
import android.webkit.MimeTypeMap;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

@CapacitorPlugin(name = "AppTools")
public class AppToolsPlugin extends Plugin {

    public static final String NOTIFICATION_CHANNEL_ID = "yaohuaji_reminders";

    @PluginMethod
    public void setAlarmClock(PluginCall call) {
        String title = call.getString("title", "妖画集 · 画稿提醒");
        String body = call.getString("body", "您有一份画稿到期提醒！");
        Long timestamp = call.getLong("timestamp");

        if (timestamp == null || timestamp <= System.currentTimeMillis()) {
            call.reject("Timestamp must be in the future");
            return;
        }

        try {
            Context ctx = getContext();
            AlarmManager alarmManager = (AlarmManager) ctx.getSystemService(Context.ALARM_SERVICE);

            Intent notifyIntent = new Intent(ctx, NotificationReceiver.class);
            notifyIntent.putExtra("title", title);
            notifyIntent.putExtra("body", body);

            int flags = PendingIntent.FLAG_UPDATE_CURRENT;
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                flags |= PendingIntent.FLAG_IMMUTABLE;
            }

            PendingIntent pendingNotify = PendingIntent.getBroadcast(
                    ctx,
                    (int) (timestamp % Integer.MAX_VALUE),
                    notifyIntent,
                    flags
            );

            // 点击闹钟跳转回 App
            Intent showIntent = new Intent(ctx, MainActivity.class);
            PendingIntent pendingShow = PendingIntent.getActivity(
                    ctx,
                    0,
                    showIntent,
                    flags
            );

            if (alarmManager != null) {
                AlarmManager.AlarmClockInfo clockInfo = new AlarmManager.AlarmClockInfo(timestamp, pendingShow);
                alarmManager.setAlarmClock(clockInfo, pendingNotify);
            }

            JSObject ret = new JSObject();
            ret.put("success", true);
            ret.put("triggerAt", timestamp);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Failed to schedule alarm clock: " + e.getMessage(), e);
        }
    }

    @PluginMethod
    public void exitApp(PluginCall call) {
        if (getActivity() != null) {
            getActivity().finishAffinity();
        }
        System.exit(0);
        call.resolve();
    }

    @PluginMethod
    public void saveToGallery(PluginCall call) {
        String base64Data = call.getString("base64Data");
        String filename = call.getString("filename", "yaohuaji_" + System.currentTimeMillis() + ".png");

        if (base64Data == null || base64Data.isEmpty()) {
            call.reject("base64Data cannot be empty");
            return;
        }

        try {
            if (base64Data.contains(",")) {
                base64Data = base64Data.substring(base64Data.indexOf(",") + 1);
            }
            byte[] imageBytes = Base64.decode(base64Data, Base64.DEFAULT);

            Context ctx = getContext();
            ContentResolver resolver = ctx.getContentResolver();
            ContentValues values = new ContentValues();
            values.put(MediaStore.Images.Media.DISPLAY_NAME, filename);
            values.put(MediaStore.Images.Media.MIME_TYPE, "image/png");
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                values.put(MediaStore.Images.Media.RELATIVE_PATH, Environment.DIRECTORY_PICTURES + "/妖画集");
                values.put(MediaStore.Images.Media.IS_PENDING, 1);
            }

            Uri uri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);
            if (uri != null) {
                try (OutputStream out = resolver.openOutputStream(uri)) {
                    if (out != null) {
                        out.write(imageBytes);
                        out.flush();
                    }
                }

                if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                    values.clear();
                    values.put(MediaStore.Images.Media.IS_PENDING, 0);
                    resolver.update(uri, values, null, null);
                }

                JSObject ret = new JSObject();
                ret.put("success", true);
                ret.put("uri", uri.toString());
                call.resolve(ret);
            } else {
                call.reject("Failed to insert media row");
            }
        } catch (Exception e) {
            call.reject("Error saving image to gallery: " + e.getMessage(), e);
        }
    }

    @PluginMethod
    public void streamCacheToDownloads(PluginCall call) {
        String cacheFileName = call.getString("cacheFileName");
        String targetFileName = call.getString("targetFileName", "yaohuaji_backup_" + System.currentTimeMillis() + ".zip");

        if (cacheFileName == null || cacheFileName.isEmpty()) {
            call.reject("cacheFileName is required");
            return;
        }

        try {
            Context ctx = getContext();
            File cacheFile = new File(ctx.getCacheDir(), cacheFileName);
            if (!cacheFile.exists()) {
                call.reject("Cache file does not exist: " + cacheFileName);
                return;
            }

            ContentResolver resolver = ctx.getContentResolver();
            ContentValues values = new ContentValues();
            values.put(MediaStore.Downloads.DISPLAY_NAME, targetFileName);
            values.put(MediaStore.Downloads.MIME_TYPE, "application/zip");
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                values.put(MediaStore.Downloads.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS + "/妖画集");
                values.put(MediaStore.Downloads.IS_PENDING, 1);
            }

            Uri uri = resolver.insert(MediaStore.Downloads.EXTERNAL_CONTENT_URI, values);
            if (uri == null) {
                call.reject("Failed to create download record");
                return;
            }

            long totalBytes = 0;
            try (InputStream in = new FileInputStream(cacheFile);
                 OutputStream out = resolver.openOutputStream(uri)) {
                if (out != null) {
                    byte[] buffer = new byte[65536]; // 64KB chunk stream
                    int read;
                    while ((read = in.read(buffer)) != -1) {
                        out.write(buffer, 0, read);
                        totalBytes += read;
                    }
                    out.flush();
                }
            }

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                values.clear();
                values.put(MediaStore.Downloads.IS_PENDING, 0);
                resolver.update(uri, values, null, null);
            }

            JSObject ret = new JSObject();
            ret.put("success", true);
            ret.put("targetPath", "Download/妖画集/" + targetFileName);
            ret.put("totalBytes", totalBytes);
            call.resolve(ret);
        } catch (Exception e) {
            call.reject("Streaming to Downloads failed: " + e.getMessage(), e);
        }
    }

    @PluginMethod
    public void pickFolder(PluginCall call) {
        // 允许通过 ACTION_OPEN_DOCUMENT_TREE 选择存储文件夹
        Intent intent = new Intent(Intent.ACTION_OPEN_DOCUMENT_TREE);
        if (getActivity() != null) {
            getActivity().startActivity(intent);
        }
        JSObject ret = new JSObject();
        ret.put("success", true);
        call.resolve(ret);
    }
}
