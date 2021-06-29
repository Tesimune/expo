// Copyright © 2018 650 Industries. All rights reserved.

#import <ABI42_0_0UMReactNativeAdapter/ABI42_0_0UMModuleRegistryAdapter.h>

@interface ABI42_0_0EXScopedModuleRegistryAdapter : ABI42_0_0UMModuleRegistryAdapter

- (ABI42_0_0UMModuleRegistry *)moduleRegistryForParams:(NSDictionary *)params forExperienceId:(NSString *)experienceId withKernelServices:(NSDictionary *)kernelServices;

@end
