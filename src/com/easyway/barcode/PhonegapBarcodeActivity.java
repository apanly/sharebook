package com.easyway.barcode;

import com.phonegap.*;
import android.os.Bundle;
import android.webkit.CookieManager;

public class PhonegapBarcodeActivity extends DroidGap {

    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/login.html");
        //CookieManager.getInstance().setAcceptCookie(true);
    }
}
