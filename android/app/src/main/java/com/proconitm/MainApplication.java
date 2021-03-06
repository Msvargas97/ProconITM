package com.proconitm;

import android.app.Application;

import com.facebook.react.ReactApplication;
import io.sichacvah.react.radio_button.RadioButtonPackage;
import com.aakashns.reactnativedialogs.ReactNativeDialogsPackage;
import com.dialogprogress.DialogProgressPackage;
import com.imagepicker.ImagePickerPackage;
import io.realm.react.RealmReactPackage;
import com.jamesisaac.rnbackgroundtask.BackgroundTaskPackage;
import com.christopherdro.htmltopdf.RNHTMLtoPDFPackage;
import com.evollu.react.fcm.FIRMessagingPackage;
import com.dylanvann.fastimage.FastImageViewPackage;
import com.reactnative.photoview.PhotoViewPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import org.devio.rn.splashscreen.SplashScreenReactPackage;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new RadioButtonPackage(),
            new ReactNativeDialogsPackage(),
            new DialogProgressPackage(),
            new ImagePickerPackage(),
            new RealmReactPackage(),
            new BackgroundTaskPackage(),
            new RNHTMLtoPDFPackage(),
            new FIRMessagingPackage(),
            new FastImageViewPackage(),
            new PhotoViewPackage(),
            new VectorIconsPackage(),
            new SplashScreenReactPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    BackgroundTaskPackage.useContext(this);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
