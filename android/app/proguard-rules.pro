# Bank AlDam Qataba - release shrinking rules
# Keep Capacitor plugin entry points and the native bridge methods used by JS.
-keep class com.getcapacitor.** { *; }
-keep class * extends com.getcapacitor.Plugin { *; }

-keepattributes *Annotation*,JavascriptInterface,Signature,InnerClasses,EnclosingMethod
-keepclassmembers class * {
    @com.getcapacitor.PluginMethod <methods>;
    @android.webkit.JavascriptInterface <methods>;
}

# Firebase Authentication plugin contains an optional Facebook provider handler.
# Facebook sign-in is not used by this app; do not bundle Facebook SDK just for that handler.
-dontwarn com.facebook.**

# Firebase and Google libraries provide their own consumer shrinker rules.
# Do not keep all Firebase / Play Services classes: that prevents effective shrinking.
-keepattributes SourceFile,LineNumberTable
