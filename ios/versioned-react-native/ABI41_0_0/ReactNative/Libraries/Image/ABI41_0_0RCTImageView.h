/*
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

#import <UIKit/UIKit.h>
#import <ABI41_0_0React/ABI41_0_0RCTView.h>
#import <ABI41_0_0React/ABI41_0_0RCTResizeMode.h>

@class ABI41_0_0RCTBridge;
@class ABI41_0_0RCTImageSource;

@interface ABI41_0_0RCTImageView : ABI41_0_0RCTView

- (instancetype)initWithBridge:(ABI41_0_0RCTBridge *)bridge NS_DESIGNATED_INITIALIZER;

@property (nonatomic, assign) UIEdgeInsets capInsets;
@property (nonatomic, strong) UIImage *defaultImage;
@property (nonatomic, assign) UIImageRenderingMode renderingMode;
@property (nonatomic, copy) NSArray<ABI41_0_0RCTImageSource *> *imageSources;
@property (nonatomic, assign) CGFloat blurRadius;
@property (nonatomic, assign) ABI41_0_0RCTResizeMode resizeMode;

@end
