/*
       Licensed to the Apache Software Foundation (ASF) under one
       or more contributor license agreements.  See the NOTICE file
       distributed with this work for additional information
       regarding copyright ownership.  The ASF licenses this file
       to you under the Apache License, Version 2.0 (the
       "License"); you may not use this file except in compliance
       with the License.  You may obtain a copy of the License at

         http://www.apache.org/licenses/LICENSE-2.0

       Unless required by applicable law or agreed to in writing,
       software distributed under the License is distributed on an
       "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
       KIND, either express or implied.  See the License for the
       specific language governing permissions and limitations
       under the License.
 */

package io.ionic.starter;

import android.Manifest;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import org.apache.cordova.*;

import java.lang.reflect.Array;
import java.util.ArrayList;

public class MainActivity extends CordovaActivity
{

    @Override
    public void onCreate(Bundle savedInstanceState)
    {
        super.onCreate(savedInstanceState);

        // enable Cordova apps to be started in the background
        Bundle extras = getIntent().getExtras();
        if (extras != null && extras.getBoolean("cdvStartInBackground", false)) {
            moveTaskToBack(true);
        }
        if(Build.VERSION.SDK_INT >= 23){
            ArrayList<String> persList = new ArrayList<String>();
            if(PackageManager.PERMISSION_DENIED == checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE)){
                persList.add(Manifest.permission.READ_EXTERNAL_STORAGE);
            }
            if(PackageManager.PERMISSION_DENIED == checkSelfPermission(Manifest.permission.CAMERA)){
                persList.add(Manifest.permission.CAMERA);
            }
            if(PackageManager.PERMISSION_DENIED == checkSelfPermission(Manifest.permission.RECORD_AUDIO)){
                persList.add(Manifest.permission.RECORD_AUDIO);
            }
            if(persList.size() != 0){
                String[] permissions = new String[persList.size()];
                persList.toArray(permissions);
                requestPermissions(permissions, 1);
            }
        }
//        if(Build.VERSION.SDK_INT >= 23 && PackageManager.PERMISSION_DENIED == checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE)) {
//            requestPermissions(new String[]{Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO}, 1);
//        }

        // Set by <content src="index.html" /> in config.xml
        loadUrl(launchUrl);
    }
}
