YUI.add("rg-confirm",function(r){r.namespace("rg"),r.rg.confirm=function(t){if(t.hasInputBox){if(t.body=r.Node.create("<p>"+t.body+"</p>"),t.inputBoxLabel){var e=r.Node.create("<label>"+t.inputBoxLabel+"</label>");t.body.appendChild(e)}var n=r.Node.create('<input type="text" class="js-confirm-input" class="text"/>');t.body.appendChild(n)}t=r.merge({headerContent:"<h4>"+t.header+"</h4>",bodyContent:t.body,footerContent:"",zIndex:1100,render:!0,visible:!1,plugins:[{fn:r.rg.widget.OverlayPopup,cfg:{handleResize:!0,hideOnClickOutside:!1}}]},t);var a,o,d=new r.rg.widget.Dialog(t),i=d.getStdModNode(r.WidgetStdMod.FOOTER);d.get("contentBox").addClass("confirm-dialog"),d.get("contentBox").one(".close a").remove(!0),(a=r.Node.create("<div></div>")).addClass("confirm-actions rf"),r.Array.each(t.buttons,function(e){var t=r.Node.create("<a></a>");t.set("href","javascript:;"),t.addClass("btn btn-margin btn-confirm-dialog"),e.primary?t.addClass("btn-promote"):e.attention?t.addClass("btn-attention"):t.addClass("btn-plain"),e.class&&t.addClass(e.class),t.setContent(e.label),t.set("id",e.id),a.append(t)}),i.append(a),o=r.Node.create('<div class="clear"></div>'),i.append(o);var c=function(){var e;return t.hasInputBox&&(e=d.bodyNode.one(".js-confirm-input").get("value")),e};return d.get("boundingBox").on("key",function(){i.one("#confirm")&&(d.hide(),d.destroy(),t.callback.call(t.context||this,"confirm",c()))},"enter",this),d.get("boundingBox").on("key",function(){i.one("#cancel")&&(d.hide(),d.destroy(),t.callback.call(t.context||this,"cancel",c()))},"esc",this),i.all(".btn-confirm-dialog").on("click",function(e){d.hide(),d.destroy(),t.callback&&t.callback.call(t.context||this,e.target.get("id"),c())},this),d.show(),d}},"0.2.0",{requires:["rg-overlay","overlay","event-key"]});
YUI.add("rg.app.webcam.WebCam",function(e){var t;e.namespace("rg.app.webcam"),navigator&&(t=navigator.getUserMedia||navigator.webkitGetUserMedia||navigator.mozGetUserMedia||navigator.msGetUserMedia||navigator.oGetUserMedia),e.rg.app.webcam.WebCam=e.Base.create("app.webcam.WebCam",e.Base,[],{destructor:function(){var e=this.get("videoNode").getDOMNode();this.stopStream(),e&&this.canPlayHandler&&e.removeEventListener("canplay",this.canPlayHandler)},showStream:function(){if(t){var a=this,i=this.get("videoNode"),r=i.getDOMNode(),n=this.get("canvasNode"),s=this.get("height"),o=this.get("width"),d=e.bind(function(e,t){this.fire(e,t)},this),h=e.bind(function(e){this.set("currentStream",e)},this);this.canPlayHandler=function(){r.removeEventListener("canplay",a.canPlayHandler),r.videoWidth>0&&(s=r.videoHeight/(r.videoWidth/o)),i.set("height",s),i.set("width",o),n.set("height",s),n.set("width",o),a.set("height",s),a.set("width",o)},r.removeEventListener("canplay",this.canPlayHandler),r.addEventListener("canplay",this.canPlayHandler),t.call(navigator,{video:!0},function(e){var t=window.URL||window.webkitURL,a=t?t.createObjectURL(e):e;i.set("src",a),h(e),d("success")},function(e){d("error",{error:e})})}else e.log("getUserMedia is not available")},stopStream:function(){var e=this.get("videoNode"),t=e.getDOMNode(),a=this.get("currentStream");if(a){t.pause();var i=a.getTracks();i?i.forEach(function(e){e.stop()}):a.stop(),e.removeAttribute("src")}},renderSnapshot:function(){var e=this.get("videoNode").getDOMNode(),t=this.get("canvasNode"),a=t.getDOMNode().getContext("2d"),i=this.get("height"),r=this.get("width");t.set("height",i),t.set("width",r),a.fillRect(0,0,r,i),a.drawImage(e,0,0,r,i)}},{isSupported:function(){return!!navigator&&!!t},ATTRS:{height:{value:240},width:{value:320},videoNode:{},canvasNode:{},currentStream:{}}})},"1.0.0",{requires:[]});
YUI.add("rg.views.profile.ProfileImageEditDialogView",function(e){e.namespace("rg.views.profile"),e.rg.views.profile.ProfileImageEditDialogView=e.Base.create("profile.ProfileImageEditDialogView",e.rg.WidgetView,[],{events:{".js-edit-save":{click:"commitEdit"},".js-delete-image":{click:"deleteImage"},".js-import-facebook":{click:"loadFacebookImage"},".js-take-photo":{click:"takePhoto"},".js-webcam-cancel":{click:"endWebCamMode"},global:{googlePictureSelect:"onGooglePictureSelect",facebookConnected:"facebookConnected","webcam:snapshot":"onWebCamSnapshot"}},destructor:function(){this.uploader&&(this.uploader.destroy(),this.uploader=null),this.imagecropper&&(this.imagecropper.destroy(),this.imagecropper=null),this.get("imageChanged")&&e.fire("editImage:imageChanged")},deactivateButton:function(){this.get("container").one(".js-edit-save").addClass("btn-disabled")},activateButton:function(){this.get("container").one(".js-edit-save").removeClass("btn-disabled")},afterRendered:function(){if(this.dialog)var t=this.dialog.before("visibleChange",function(e){!1===e.newVal&&this.imagecropper&&(this.imagecropper.destroy(),t.detach())},this);this.uploader=new e.Uploader({multipleFiles:!1,selectFilesButton:this.get("container").one(".js-upload-image"),fileFieldName:"image",uploadURL:this.data.uploadUrl,uploadHeaders:{"Rg-Request-Token":RGCommons.requestToken.get()},simLimit:1,enabled:!0,appendNewFiles:!1,fileInputId:this.data.fileInputId}),this.uploader.render(this.get("container").one(".js-select-file-container")),this.uploader.before("fileListChange",function(t){if(t.newVal.length>0){var a=t.newVal[0],i=a.get("name").split(".").pop(),o=a.get("size");i=i.toLowerCase();var s=e.Array.find(this.data.extensions,function(e){return i==e});(o>this.data.maxFileSize||!s)&&(e.rg.notify(this.data.errorMsg,"warning"),t.stopImmediatePropagation())}},this),this.uploader.after("fileListChange",function(e){e.newVal.length>0&&this.uploader.uploadAll()},this),this.uploader.after("uploaderror",function(){this.uploader.set("fileList",[])},this),this.uploader.on("uploadstart",function(){this.uploader.set("enabled",!1)},this),this.uploader.on("fileuploadstart",function(t){e.fire("ProfileImageEditDialog:fileUploadStart",t)},this),this.uploader.on("uploadprogress",function(t){e.fire("ProfileImageEditDialog:fileUploadProgress",t)},this),this.uploader.on("uploadcomplete",this.onUploadComplete,this),this.initImageCropper(),this.get("loadFacebookImage")&&this.loadFacebookImage(),this.get("suggestedImage")&&this.loadSuggestedImage(),this.get("useWebCam")&&this.initWebCam()},reloadWidget:function(e){this.reload({imagePreviewData:e,imageSource:this.get("imageSource"),encExpParams:this.data.encExpParams,fileInputId:this.data.fileInputId})},onWebCamSnapshot:function(t){var a=this.get("container");a.one(".js-webcam-mode").addClass("rendering");var i=t.image;e.rg.ajaxDbwAware("profile.ProfileImageEditDialog.ajaxHandleWebCamImage.html",{account_key:this.data.accountKey,image:i},function(e){a.one(".js-webcam-mode").removeClass("rendering"),e.success?(this.set("imageSource","webcam"),this.resetSuggestedImage(),this.updateUiAfterImageHandled(e),this.endWebCamMode()):this.handleErrorResponse(e)},this,null,"POST")},initWebCam:function(){e.rg.app.webcam.WebCam.isSupported()?this.get("container").one("#c-webcam-start-wrapper").show():e.log("WebCam is not supported.")},takePhoto:function(){var e=this.get("container");e.addClass("rendering"),widgetLoader.loadWidget("application.WebCamDialog.html",{accountId:this.data.accountId},function(t){t.render({append:e.one(".js-webcam-mode")}),e.one(".js-default-mode").hide(),e.one(".js-webcam-mode").show(),e.removeClass("rendering")})},endWebCamMode:function(){var e=this.get("container");e.one(".js-webcam-container").remove(!0),e.one(".js-webcam-mode").hide(),e.one(".js-default-mode").show()},initImageCropper:function(){if(this.imagecropper&&this.imagecropper.destroy(),this.data.imagePreview){this.activateButton();var e={src:this.data.imagePreview,height:this.data.previewHeight,width:this.data.previewWidth};this.data.isMobileDevice?this.renderAutoCroppedImage(e):(this.renderImageCropper(e),this.data.previewWidth<=this.data.minWidth||this.data.previewHeight==this.data.minHeight?this.get("container").one("#imagecropper").addClass("disable-resize"):this.get("container").one("#imagecropper").removeClass("disable-resize"))}},renderImageCropper:function(t){this.imagecropper=new e.ImageCropper({source:t.src,width:t.width,height:t.height,minWidth:this.data.minWidth,minHeight:this.data.minHeight,initWidth:this.data.cropWidth,initHeight:this.data.cropHeight,preserveRatio:!0,initialXY:[this.data.cropX,this.data.cropY]}),this.imagecropper.render("#imagecropper")},setAutoCroppedImageData:function(e,t,a,i,o){this.set("autoCroppedImageData",{height:(i/o).toFixed(),left:a?(e/o).toFixed():0,top:a?0:(t/o).toFixed(),width:(i/o).toFixed()})},renderAutoCroppedImage:function(t){var a,i=t.width>250?250:t.width,o=i/t.width,s=(t.height*o).toFixed(),r=i>s,n=r?s:i,d=i+"px "+s+"px",g=(i-n)/2,h=(s-n)/2,l=r?-g+"px 0":"0 "+-h+"px",c="background-image: url("+t.src+"); background-position: "+l+"; background-size: "+d+";"+(" height: "+n+"px; width: "+n+"px;");this.get("imageSource")?(this.setAutoCroppedImageData(g,h,r,n,o),a=e.Node.create('<div class="auto-cropped-image" style="'+c+'"></div>')):a=e.Node.create('<img src="'+this.data.imagePreview+'" class="auto-cropped-image" width="'+this.data.minWidth+'" height="'+this.data.minHeight+'" />'),e.one("#imagecropper").setHTML(a)},commitEdit:function(e){e.preventDefault(),e.currentTarget.addClass("btn-disabled"),this.data.isMobileDevice?this.commitEditTouch():this.commitEditDesktop()},scoreGoal:function(){e.rg.ajax("application.AjaxCommon.ajaxScoreGoal.html",{encExpParams:this.data.encExpParams},null,this,null,"POST"),e.rg.notify("Your photo has successfully been added to your profile.")},commitEditTouch:function(){var t={account_key:this.data.accountKey,cropMethod:this.data.cropMethod,croppingChanged:!0,experimentSource:this.data.experimentSource,height:this.get("autoCroppedImageData").height,imageChanged:this.get("temporaryImageChanged"),imageSource:this.get("imageSource"),left:this.get("autoCroppedImageData").left,previewId:this.get("previewId"),top:this.get("autoCroppedImageData").top,width:this.get("autoCroppedImageData").width};this.get("suggestedImage")&&(t.suggestedImage=this.get("suggestedImage")),e.rg.ajaxDbwAware(this.widgetUrl,t,function(e){e.success&&this.scoreGoal(),this._onCropResponse(e)},this,null,"POST")},commitEditDesktop:function(){var t=this.imagecropper.getCropCoords();t.croppingChanged=null,this.data&&this.data.cropX&&this.data.cropY&&this.data.cropHeight&&this.data.cropWidth&&(this.data.cropX+this.data.cropY+this.data.cropHeight+this.data.cropWidth!==t.left+t.top+t.height+t.width?t.croppingChanged=!0:t.croppingChanged=!1),t.account_key=this.data.accountKey,t.imageChanged=this.get("temporaryImageChanged"),t.experimentSource=this.data.experimentSource,t.imageSource=this.get("imageSource"),t.cropMethod=this.data.cropMethod,t.previewId=this.get("previewId"),this.get("suggestedImage")&&(t.suggestedImage=this.get("suggestedImage")),e.rg.ajaxDbwAware(this.widgetUrl,t,this._onCropResponse,this,null,"POST")},_onCropResponse:function(e){e.success&&(this.set("imageChanged",!0),this.dialog.hide())},deleteImage:function(t){t.preventDefault(),confirm("Are you sure you want to delete your profile photo?")&&(e.rg.ajaxDbwAware("profilecommon.ProfileImage.html",{account_key:this.data.accountKey},function(){e.fire("editImage:imageChanged")},this,null,"DELETE"),this.dialog.hide())},setVisibleContent:function(e){this.get("container").one(".content-item-wrapper").all(".content-item").each(function(t){e===t.get("id")?t.show():t.hide()})},onUploadComplete:function(t){e.fire("ProfileImageEditDialog:fileUploadComplete",t),this.uploader.set("enabled",!0),this.uploader.set("fileList",[]);var a=e.JSON.parse(t.data);a.success?(e.fire("ProfilePictureGooglePicker:resetSelection"),this.set("imageSource",this.data.isMobileDevice?"uploadTouchDevice":"upload"),this.resetSuggestedImage(),e.rg.ajax("profile.ProfileImageEditDialog.ajaxAfterUploadCompleted.html"),this.updateUiAfterImageHandled(a)):this.handleErrorResponse(a)},onGooglePictureSelect:function(t){this.deactivateButton(),this.setVisibleContent("imagepicker-processing"),t.itemData.suggestionId?this.loadGoogleImageSuggestion(t.itemData.suggestionId):t.itemData.link?this.loadGoogleImage(t.itemData.link):e.rg.notify("Image could not be identified","warning")},loadGoogleImage:function(t){e.rg.ajaxDbwAware("profile.ProfileImageEditDialog.ajaxHandleGoogleImage.html",{account_key:this.data.accountKey,imageLink:t},function(e){e.success?(this.set("imageSource","google"),this.resetSuggestedImage(),this.updateUiAfterImageHandled(e)):this.handleErrorResponse(e)},this,null,"POST")},loadGoogleImageSuggestion:function(t){e.rg.ajaxDbwAware("profile.ProfileImageEditDialog.ajaxHandleSuggestedImage.html",{account_key:this.data.accountKey,suggestedImage:t},function(e){e.success?(this.set("imageSource","google"),this.resetSuggestedImage(),this.updateUiAfterImageHandled(e)):this.handleErrorResponse(e)},this,null,"POST")},addTemporaryId:function(e){var t=this.get("temporaryImageIds");t.push(e),this.set("temporaryImageIds",t)},enableFacebookButton:function(){var e=this.get("container");if(e){var t=e.one(".js-import-facebook");t&&t.removeClass("btn-disabled")}},disableFacebookButton:function(){var e=this.get("container");if(e){var t=e.one(".js-import-facebook");t&&t.addClass("btn-disabled")}},facebookConnected:function(){this.disableFacebookButton(),this.loadFacebookImage()},loadFacebookImage:function(){this.disableFacebookButton(),e.rg.ajaxDbwAware("profile.ProfileImageEditDialog.ajaxHandleFacebookImage.html",{account_key:this.data.accountKey},function(t){t.success?(e.fire("ProfilePictureGooglePicker:resetSelection"),this.set("imageSource","facebook"),this.resetSuggestedImage(),this.updateUiAfterImageHandled(t)):this.handleErrorResponse(t)},this,null,"POST")},loadSuggestedImage:function(){e.rg.ajaxDbwAware("profile.ProfileImageEditDialog.ajaxHandleSuggestedImage.html",{account_key:this.data.accountKey,suggestedImage:this.get("suggestedImage")},function(t){t.success?(e.fire("ProfilePictureGooglePicker:resetSelection"),this.set("imageSource","suggestion"),this.updateUiAfterImageHandled(t)):this.handleErrorResponse(t)},this,null,"POST")},updateUiAfterImageHandled:function(e){this.updateData(e.result),this.initImageCropper(),this.setVisibleContent("imagecropper"),this.set("temporaryImageChanged",!0),this.set("previewId",e.result.previewId),this.addTemporaryId(e.result.previewId),this.enableFacebookButton();var t=this.get("container").one(".js-google-picker");t&&(this.imagecropper?t.hide():t.show()),this.get("isCompact")&&this.reloadWidget(e.result)},resetSuggestedImage:function(){this.set("suggestedImage",null)},handleErrorResponse:function(t){t.errors.image?e.rg.notify(t.errors.image[0],"warning",3e4):e.rg.notify(t.errors,"warning",3e4),this.enableFacebookButton(),this.data.imagePreview?(this.activateButton(),this.setVisibleContent("imagecropper")):this.setVisibleContent("defaultImage")}},{ATTRS:{autoCroppedImageData:{value:{}},imageChanged:{value:!1},temporaryImageChanged:{value:!1},imageSource:{value:""},previewId:{value:""},temporaryImageIds:{value:[]},isCompact:{value:!1},loadFacebookImage:{value:!1},suggestedImage:{},useWebCam:{value:!1}}})},"0.0.1",{requires:["rg-header-notify","gallery-imagecropper","uploader","rg-confirm","rg.app.webcam.WebCam"]});
