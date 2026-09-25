package com.yaohuaji.app;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(AppToolsPlugin.class);
        super.onCreate(savedInstanceState);
    }
}
