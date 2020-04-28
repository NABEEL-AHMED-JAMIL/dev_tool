import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CaptchaService } from '@/_services';
import { take } from 'rxjs/operators';

export const PROCESS_TYPE = [
    // "IPL_BORDER_CONSTANT","IPL_BORDER_REPLICATE","IPL_BORDER_REFLECT","IPL_BORDER_WRAP",
    // "IPL_BORDER_REFLECT_101","IPL_BORDER_TRANSPARENT","CV_INTER_NN","CV_INTER_LINEAR",
    // "CV_INTER_CUBIC","CV_INTER_AREA","CV_INTER_LANCZOS4","CV_MOP_ERODE","CV_MOP_DILATE",
    // "CV_MOP_OPEN","CV_MOP_CLOSE","CV_MOP_GRADIENT","CV_MOP_TOPHAT","CV_MOP_BLACKHAT","CV_RETR_EXTERNAL",
    // "CV_RETR_LIST","CV_RETR_CCOMP","CV_RETR_TREE","CV_RETR_FLOODFILL","CV_CHAIN_APPROX_NONE",
    // "CV_CHAIN_APPROX_SIMPLE","CV_CHAIN_APPROX_TC89_L1","CV_CHAIN_APPROX_TC89_KCOS",
    // "CV_THRESH_BINARY","CV_THRESH_BINARY_INV","CV_THRESH_TRUNC","CV_THRESH_TOZERO",
    // "CV_THRESH_TOZERO_INV","CV_THRESH_MASK","CV_THRESH_OTSU","CV_THRESH_TRIANGLE",
    "LINE_AA","LINE_8","LINE_4","CV_BLUR_NO_SCALE","CV_BLUR","CV_GAUSSIAN","CV_MEDIAN",
    "CV_BILATERAL","CV_GAUSSIAN_5x5","CV_SCHARR","CV_MAX_SOBEL_KSIZE",
    "CV_RGBA2mRGBA","CV_mRGBA2RGBA","CV_WARP_FILL_OUTLIERS","CV_WARP_INVERSE_MAP",
    "CV_SHAPE_RECT","CV_SHAPE_CROSS","CV_SHAPE_ELLIPSE","CV_SHAPE_CUSTOM",
    "CV_CHAIN_CODE","CV_LINK_RUNS","CV_POLY_APPROX_DP","CV_CONTOURS_MATCH_I1",
    "CV_CONTOURS_MATCH_I2","CV_CONTOURS_MATCH_I3","CV_CLOCKWISE","CV_COUNTER_CLOCKWISE",
    "CV_COMP_CORREL","CV_COMP_CHISQR","CV_COMP_INTERSECT","CV_COMP_BHATTACHARYYA",
    "CV_COMP_HELLINGER","CV_COMP_CHISQR_ALT","CV_COMP_KL_DIV","CV_DIST_MASK_3","CV_DIST_MASK_5",
    "CV_DIST_MASK_PRECISE","CV_DIST_LABEL_CCOMP","CV_DIST_LABEL_PIXEL","CV_DIST_USER",
    "CV_DIST_L1","CV_DIST_L2","CV_DIST_C","CV_DIST_L12","CV_DIST_FAIR","CV_DIST_WELSCH",
    "CV_DIST_HUBER","CV_CANNY_L2_GRADIENT","CV_HOUGH_STANDARD","CV_HOUGH_PROBABILISTIC",
    "CV_HOUGH_MULTI_SCALE","CV_HOUGH_GRADIENT","MORPH_ERODE","MORPH_DILATE",
    "MORPH_OPEN","MORPH_CLOSE","MORPH_GRADIENT","MORPH_TOPHAT",
    "MORPH_BLACKHAT","MORPH_HITMISS","MORPH_RECT","MORPH_CROSS",
    "MORPH_ELLIPSE","INTER_NEAREST","INTER_LINEAR","INTER_CUBIC",
    "INTER_AREA","INTER_LANCZOS4","INTER_LINEAR_EXACT","INTER_MAX",
    "WARP_FILL_OUTLIERS","WARP_INVERSE_MAP","WARP_POLAR_LINEAR","WARP_POLAR_LOG",
    "INTER_BITS","INTER_BITS2","INTER_TAB_SIZE","INTER_TAB_SIZE2",
    "DIST_USER","DIST_L1","DIST_L2","DIST_C", "DIST_L12","DIST_FAIR","DIST_WELSCH","DIST_HUBER",
    "DIST_MASK_3","DIST_MASK_5","DIST_MASK_PRECISE","THRESH_BINARY","THRESH_BINARY_INV","THRESH_TRUNC","THRESH_TOZERO",
    "THRESH_TOZERO_INV","THRESH_MASK","THRESH_OTSU","THRESH_TRIANGLE",
    "ADAPTIVE_THRESH_MEAN_C","ADAPTIVE_THRESH_GAUSSIAN_C","PROJ_SPHERICAL_ORTHO",
    "PROJ_SPHERICAL_EQRECT","GC_BGD","GC_FGD","GC_PR_BGD","GC_PR_FGD",
    "GC_INIT_WITH_RECT","GC_INIT_WITH_MASK","GC_EVAL","GC_EVAL_FREEZE_MODEL",
    "DIST_LABEL_CCOMP","DIST_LABEL_PIXEL","FLOODFILL_FIXED_RANGE",
    "FLOODFILL_MASK_ONLY","CC_STAT_LEFT","CC_STAT_TOP","CC_STAT_WIDTH",
    "CC_STAT_HEIGHT","CC_STAT_AREA","CC_STAT_MAX","CCL_WU",
    "CCL_DEFAULT","CCL_GRANA","RETR_EXTERNAL","RETR_LIST",
    "RETR_CCOMP","RETR_TREE","RETR_FLOODFILL","CHAIN_APPROX_NONE",
    "CHAIN_APPROX_SIMPLE","CHAIN_APPROX_TC89_L1","CHAIN_APPROX_TC89_KCOS","CONTOURS_MATCH_I1",
    "CONTOURS_MATCH_I2","CONTOURS_MATCH_I3","HOUGH_STANDARD","HOUGH_PROBABILISTIC","HOUGH_MULTI_SCALE",
    "HOUGH_GRADIENT","LSD_REFINE_NONE","LSD_REFINE_STD",
    "LSD_REFINE_ADV","HISTCMP_CORREL","HISTCMP_CHISQR","HISTCMP_INTERSECT","HISTCMP_BHATTACHARYYA",
    "HISTCMP_HELLINGER","HISTCMP_CHISQR_ALT","HISTCMP_KL_DIV","COLOR_BGR2BGRA",
    "COLOR_RGB2RGBA","COLOR_BGRA2BGR","COLOR_RGBA2RGB","COLOR_BGR2RGBA",
    "COLOR_RGB2BGRA","COLOR_RGBA2BGR","COLOR_BGRA2RGB","COLOR_BGR2RGB",
    "COLOR_RGB2BGR","COLOR_BGRA2RGBA","COLOR_RGBA2BGRA","COLOR_BGR2GRAY",
    "COLOR_RGB2GRAY","COLOR_GRAY2BGR","COLOR_GRAY2RGB","COLOR_GRAY2BGRA",
    "COLOR_GRAY2RGBA","COLOR_BGRA2GRAY","COLOR_RGBA2GRAY","COLOR_BGR2BGR565",
    "COLOR_RGB2BGR565","COLOR_BGR5652BGR","COLOR_BGR5652RGB","COLOR_BGRA2BGR565",
    "COLOR_RGBA2BGR565","COLOR_BGR5652BGRA","COLOR_BGR5652RGBA","COLOR_GRAY2BGR565",
    "COLOR_BGR5652GRAY","COLOR_BGR2BGR555","COLOR_RGB2BGR555","COLOR_BGR5552BGR",
    "COLOR_BGR5552RGB","COLOR_BGRA2BGR555","COLOR_RGBA2BGR555","COLOR_BGR5552BGRA",
    "COLOR_BGR5552RGBA","COLOR_GRAY2BGR555","COLOR_BGR5552GRAY","COLOR_BGR2XYZ",
    "COLOR_RGB2XYZ","COLOR_XYZ2BGR","COLOR_XYZ2RGB","COLOR_BGR2YCrCb",
    "COLOR_RGB2YCrCb","COLOR_YCrCb2BGR","COLOR_YCrCb2RGB","COLOR_BGR2HSV",
    "COLOR_RGB2HSV","COLOR_BGR2Lab","COLOR_RGB2Lab","COLOR_BGR2Luv",
    "COLOR_RGB2Luv","COLOR_BGR2HLS","COLOR_RGB2HLS","COLOR_HSV2BGR",
    "COLOR_HSV2RGB","COLOR_Lab2BGR","COLOR_Lab2RGB","COLOR_Luv2BGR",
    "COLOR_Luv2RGB","COLOR_HLS2BGR","COLOR_HLS2RGB","COLOR_BGR2HSV_FULL",
    "COLOR_RGB2HSV_FULL","COLOR_BGR2HLS_FULL","COLOR_RGB2HLS_FULL","COLOR_HSV2BGR_FULL",
    "COLOR_HSV2RGB_FULL","COLOR_HLS2BGR_FULL","COLOR_HLS2RGB_FULL","COLOR_LBGR2Lab",
    "COLOR_LRGB2Lab","COLOR_LBGR2Luv","COLOR_LRGB2Luv","COLOR_Lab2LBGR",
    "COLOR_Lab2LRGB","COLOR_Luv2LBGR","COLOR_Luv2LRGB","COLOR_BGR2YUV",
    "COLOR_RGB2YUV","COLOR_YUV2BGR","COLOR_YUV2RGB","COLOR_YUV2RGB_NV12",
    "COLOR_YUV2BGR_NV12","COLOR_YUV2RGB_NV21","COLOR_YUV2BGR_NV21","COLOR_YUV420sp2RGB",
    "COLOR_YUV420sp2BGR","COLOR_YUV2RGBA_NV12","COLOR_YUV2BGRA_NV12","COLOR_YUV2RGBA_NV21",
    "COLOR_YUV2BGRA_NV21","COLOR_YUV420sp2RGBA","COLOR_YUV420sp2BGRA","COLOR_YUV2RGB_YV12",
    "COLOR_YUV2BGR_YV12","COLOR_YUV2RGB_IYUV","COLOR_YUV2BGR_IYUV","COLOR_YUV2RGB_I420",
    "COLOR_YUV2BGR_I420","COLOR_YUV420p2RGB","COLOR_YUV420p2BGR","COLOR_YUV2RGBA_YV12",
    "COLOR_YUV2BGRA_YV12","COLOR_YUV2RGBA_IYUV","COLOR_YUV2BGRA_IYUV","COLOR_YUV2RGBA_I420",
    "COLOR_YUV2BGRA_I420","COLOR_YUV420p2RGBA","COLOR_YUV420p2BGRA","COLOR_YUV2GRAY_420",
    "COLOR_YUV2GRAY_NV21","COLOR_YUV2GRAY_NV12","COLOR_YUV2GRAY_YV12","COLOR_YUV2GRAY_IYUV",
    "COLOR_YUV2GRAY_I420","COLOR_YUV420sp2GRAY","COLOR_YUV420p2GRAY","COLOR_YUV2RGB_UYVY",
    "COLOR_YUV2BGR_UYVY","COLOR_YUV2RGB_Y422","COLOR_YUV2BGR_Y422","COLOR_YUV2RGB_UYNV",
    "COLOR_YUV2BGR_UYNV","COLOR_YUV2RGBA_UYVY","COLOR_YUV2BGRA_UYVY","COLOR_YUV2RGBA_Y422",
    "COLOR_YUV2BGRA_Y422","COLOR_YUV2RGBA_UYNV","COLOR_YUV2BGRA_UYNV","COLOR_YUV2RGB_YUY2",
    "COLOR_YUV2BGR_YUY2","COLOR_YUV2RGB_YVYU","COLOR_YUV2BGR_YVYU","COLOR_YUV2RGB_YUYV",
    "COLOR_YUV2BGR_YUYV","COLOR_YUV2RGB_YUNV","COLOR_YUV2BGR_YUNV","COLOR_YUV2RGBA_YUY2",
    "COLOR_YUV2BGRA_YUY2","COLOR_YUV2RGBA_YVYU","COLOR_YUV2BGRA_YVYU","COLOR_YUV2RGBA_YUYV",
    "COLOR_YUV2BGRA_YUYV","COLOR_YUV2RGBA_YUNV","COLOR_YUV2BGRA_YUNV","COLOR_YUV2GRAY_UYVY",
    "COLOR_YUV2GRAY_YUY2","COLOR_YUV2GRAY_Y422","COLOR_YUV2GRAY_UYNV","COLOR_YUV2GRAY_YVYU",
    "COLOR_YUV2GRAY_YUYV","COLOR_YUV2GRAY_YUNV","COLOR_RGBA2mRGBA","COLOR_mRGBA2RGBA",
    "COLOR_RGB2YUV_I420","COLOR_BGR2YUV_I420","COLOR_RGB2YUV_IYUV","COLOR_BGR2YUV_IYUV",
    "COLOR_RGBA2YUV_I420","COLOR_BGRA2YUV_I420","COLOR_RGBA2YUV_IYUV","COLOR_BGRA2YUV_IYUV",
    "COLOR_RGB2YUV_YV12","COLOR_BGR2YUV_YV12","COLOR_RGBA2YUV_YV12","COLOR_BGRA2YUV_YV12",   
    "COLOR_BayerBG2BGR","COLOR_BayerGB2BGR","COLOR_BayerRG2BGR","COLOR_BayerGR2BGR",   
    "COLOR_BayerBG2RGB","COLOR_BayerGB2RGB","COLOR_BayerRG2RGB","COLOR_BayerGR2RGB",
    "COLOR_BayerBG2GRAY","COLOR_BayerGB2GRAY","COLOR_BayerRG2GRAY",
    "COLOR_BayerGR2GRAY","COLOR_BayerBG2BGR_VNG","COLOR_BayerGB2BGR_VNG","COLOR_BayerRG2BGR_VNG",
    "COLOR_BayerGR2BGR_VNG","COLOR_BayerBG2RGB_VNG","COLOR_BayerGB2RGB_VNG",
    "COLOR_BayerRG2RGB_VNG","COLOR_BayerGR2RGB_VNG","COLOR_BayerBG2BGR_EA","COLOR_BayerGB2BGR_EA",
    "COLOR_BayerRG2BGR_EA","COLOR_BayerGR2BGR_EA","COLOR_BayerBG2RGB_EA","COLOR_BayerGB2RGB_EA","COLOR_BayerRG2RGB_EA","COLOR_BayerGR2RGB_EA",
    "COLOR_BayerBG2BGRA","COLOR_BayerGB2BGRA","COLOR_BayerRG2BGRA","COLOR_BayerGR2BGRA",
    "COLOR_BayerBG2RGBA","COLOR_BayerGB2RGBA","COLOR_BayerRG2RGBA","COLOR_BayerGR2RGBA","COLOR_COLORCVT_MAX",
    "INTERSECT_NONE","INTERSECT_PARTIAL","INTERSECT_FULL","TM_SQDIFF",
    "TM_SQDIFF_NORMED","TM_CCORR","TM_CCORR_NORMED","TM_CCOEFF",
    "TM_CCOEFF_NORMED","COLORMAP_AUTUMN","COLORMAP_BONE","COLORMAP_JET",
    "COLORMAP_WINTER","COLORMAP_RAINBOW","COLORMAP_OCEAN","COLORMAP_SUMMER","COLORMAP_SPRING",
    "COLORMAP_COOL","COLORMAP_HSV","COLORMAP_PINK","COLORMAP_HOT","COLORMAP_PARULA",
    "MARKER_CROSS","MARKER_TILTED_CROSS","MARKER_STAR",
    "MARKER_DIAMOND","MARKER_SQUARE","MARKER_TRIANGLE_UP","MARKER_TRIANGLE_DOWN"
];    


@Component({
    templateUrl: 'captcha.component.html'
})
export class CaptchaComponent implements OnInit {

    public message: string = "--";
    public decode_text_message: string;
    public decode_image: any;
    public decode_voice_message: string;
    public imageCaptchaForm: FormGroup;
    public voiceCaptchaForm: FormGroup;
    public imageCompare: FormGroup;
    public file: File;
    public imgURL: any;

    public image1: any;
    public image1File: File;
    public image2: any;
    public image2File: File;
    public resultImage: any;
    public extData: any;
    
    public imagePath;
    public process_type: any = PROCESS_TYPE;
    public reqeustSubmitFrom: any;

    constructor(private captchaService: CaptchaService, public fb: FormBuilder) {}

    // default => 2,85,150
    ngOnInit() {
        this.imageCaptchaForm = this.fb.group( {
            file: new FormControl(null, Validators.required),
            process: new FormControl('CCL_GRANA', Validators.required),
            size: new FormControl(2, Validators.required),
            thresh: new FormControl(85, Validators.required),
            background: new FormControl(150, Validators.required),
        });
        this.voiceCaptchaForm = this.fb.group( {
            file: new FormControl(null, Validators.required),
        });

        this.imageCompare = this.fb.group( {
            oldImage: new FormControl(null, Validators.required),
            newImage: new FormControl(null, Validators.required),
            threshold: new FormControl(10,Validators.required),
            rectangleLineWidth: new FormControl(5,Validators.required),
            fillDifferenceRectangles: new FormControl(true,Validators.required),
            percentOpacityDifferenceRectangles: new FormControl(30.0,Validators.required),
            fillExcludedRectangles: new FormControl(true,Validators.required),
            percentOpacityExcludedRectangles: new FormControl(30.0,Validators.required),
            maximalRectangleCount: new FormControl(10,Validators.required),
            minimalRectangleSize: new FormControl(100,Validators.required),
            pixelToleranceLevel: new FormControl(0.2,Validators.required),
            drawExcludedRectangles: new FormControl(false,Validators.required),
            allowingPercentOfDifferentPixels: new FormControl(0.0,Validators.required),
        });
    }

    public addFile(file: File): void {
        this.file = file;   
        var mimeType = file.type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }
        var reader = new FileReader();
        reader.readAsDataURL(file); 
        reader.onload = (_event) => { 
            this.imgURL = reader.result; 
        }
    }

    public addFileV1(file: File, imgNumber:any): void {
        var mimeType = file.type;
        if (mimeType.match(/image\/*/) == null) {
            this.message = "Only images are supported.";
            return;
        }
        var reader = new FileReader();
        if(imgNumber === 1) {
            this.image1File = file;
            reader.readAsDataURL(file); 
        } else if(imgNumber === 2) {
            this.image2File = file;
            reader.readAsDataURL(file); 
        }        
        reader.onload = (_event) => { 
            if(imgNumber === 1) {
                this.image1 = reader.result; 
            } else if(imgNumber === 2) {
                this.image2 = reader.result; 
            }
        }
    }

    public processImg(): void {
        console.log(this.imageCaptchaForm.value);
        this.reqeustSubmitFrom = new FormData();
        this.reqeustSubmitFrom.append('file',  this.file, this.file.name);
        this.reqeustSubmitFrom.append('process', this.imageCaptchaForm.value.process);
        this.reqeustSubmitFrom.append('size', this.imageCaptchaForm.value.size);
        this.reqeustSubmitFrom.append('thresh', this.imageCaptchaForm.value.thresh);
        this.reqeustSubmitFrom.append('background', this.imageCaptchaForm.value.background);
        this.captchaService.getProcessImage(this.reqeustSubmitFrom)
        .subscribe((response: any) => {
            this.message = response.message;
            this.decode_text_message = response.text;
            this.decode_image = 'data:image/png;base64,' + response.data;
        }, error => {
            this.message = error.error.message;
            console.log('Error :- ' + JSON.stringify(error));
        });
    }

    public compareImg(): void {
        this.reqeustSubmitFrom = new FormData();
        this.reqeustSubmitFrom.append('oldImage',  this.image1File, this.image1File.name);
        this.reqeustSubmitFrom.append('newImage', this.image2File, this.image2File.name);
        this.reqeustSubmitFrom.append('threshold', this.imageCompare.value.threshold);
        this.reqeustSubmitFrom.append('rectangleLineWidth', this.imageCompare.value.rectangleLineWidth);
        this.reqeustSubmitFrom.append('fillDifferenceRectangles', this.imageCompare.value.fillDifferenceRectangles);
        this.reqeustSubmitFrom.append('percentOpacityDifferenceRectangles', this.imageCompare.value.percentOpacityDifferenceRectangles);
        this.reqeustSubmitFrom.append('fillExcludedRectangles', this.imageCompare.value.fillExcludedRectangles);
        this.reqeustSubmitFrom.append('percentOpacityExcludedRectangles', this.imageCompare.value.percentOpacityExcludedRectangles);
        this.reqeustSubmitFrom.append('maximalRectangleCount', this.imageCompare.value.maximalRectangleCount);
        this.reqeustSubmitFrom.append('minimalRectangleSize', this.imageCompare.value.minimalRectangleSize);
        this.reqeustSubmitFrom.append('pixelToleranceLevel', this.imageCompare.value.pixelToleranceLevel);
        this.reqeustSubmitFrom.append('drawExcludedRectangles', this.imageCompare.value.drawExcludedRectangles);
        this.reqeustSubmitFrom.append('allowingPercentOfDifferentPixels', this.imageCompare.value.allowingPercentOfDifferentPixels);

        this.captchaService.imageReaderV2(this.reqeustSubmitFrom)
            .pipe(take(1))
            .subscribe(
                (response: any) => {
                    this.resultImage = 'data:image/png;base64,' + response.data;
                    this.extData = response.ext;
                }, (error) => {
                    this.message = error.error.message;
                    console.log('Error :- ' + JSON.stringify(error));
            });
    }

}