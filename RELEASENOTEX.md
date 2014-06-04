

## 3.3.0-0.0.1 (Wed Jun 04 2014)


 *  解决不能查找到依赖插件的bug
 *  解决不能添加extra-player插件的bug
 *  修改版本号
 *  合并xmen-cli脚本代码
 *  解决单元测试中的错误
 *  同步xplugin代码，并解决spec-plugman单元测试错误
 *  同步xface-cli脚本代码（未测试通过）
 *  将cordova-lib改名为xface-lib
 *  Start using PluginInfo object in plugman/install.js
 *  Fix create.spec - don't expect merges dir
 *  CB-6709 Remove merges/ folder for default apps
 *  support for shrinkwrap flag
 *  Initial implementation for restore and save plugin
 *  Remove unused code from plugman/install.js
 *  Style fixes in plugman/insall.js, jshint runs with no warnings
 *  CB-6668: Use <description> for "plugin ls" when <name> is missing.
 *  Add --noregstry flag for disabling plugin lookup in the registry
 *  added dev to version number
 *  Remove --force from default npm settings for plugin registry
 *  Use "npm info" for fetching plugin metadata
 *  Use "npm cache add" for downloading plugins
 *  CB-6691: Change some instances of Error() to CordovaError()
 *  update version for republish
 *  update version for republish
 *  CB-2606 add launcher icon support for FirefoxOS
 *  CB-6674 handle missing plugins in dependencies
 *  [CB-6675][amazon-fireos]Adding amazon-fireos platform fails with an error in amazon_fireos_parser.js Fixed the error.
 *  CB-6415 [BlackBerry10] fix check_reqs for custom paths
 *  updated npm shrinkwrap
 *  had to update version to republish on npm
 *  moved osenv module to dev from devdependencies
 *  ran npm-shrinkwrap
 *  CB-6586: removed dev from version for npm publish
 *  Use null as plugin name for plugins with no <name>
 *  CB-4456: Remove plugins-plist bits from the tests
 *  CB-6655 Export plugin ID to hooks when adding plugins from Git repos
 *  CB-6594: pulled in CLI PR for ubuntu, close apache/cordova-cliissue 136
 *  added setup instructions to README.md
 *  [CB-6622][amazon-fireos]Adding icon support for fire os Recently icons support was added for all platforms but amazon-fireos. This commit adds it for amazon-fireos. Icons can be specified in config.xml.
 *  [cb-6619][amazon-fireos] userLandscape is not supported on Kindle Fire OS changed userLandscape to landscape and userPortrait to portrait.
 *  Merge xml-helpers from cli and plugman
 *  CB-5259: Print plugin versions and check deps
 *  Fix READMEs and REALEASENOTES.
 *  Moved REALEASENOTES to cordova-lib/
 *  Updte require paths, add cordova-lib.js
 *  Update package.json for cordova-lib
 *  Add spec dirs to .npmignore
 *  Fix .gitignore
 *  Split out cordova-lib: move cordova-cli files
 *  [Windows8] re-added BOM : CB-5421 Add BOM to all html, js, css files to ensure app can pass Windows Store Certification
 *  CB-6491 add CONTRIBUTING.md
 *  Windows 8.1 update breaks app manifest parser
 *  CB-5833: Copy/link to custom merges and config.xml when
 *  Check if privileged attribute is 'true'
 *  Adding support for privileged
 *  Merge pull request issue 4 from rodms10/autoPermission
 *  Remove trailing spaces in all js files
 *  android-parser: Add AndroidLaunchMode preference
 *  Fix CLI tests to work with node v0.11
 *  Update version of jasmine-node. Fixes test warnings util.print with node 0.11
 *  CB-2606 Andriod icon - do not attempt copy to undefined path
 *  CB-2606 Icons support for iOS, Android, BB10, WP8, Win8, FxOS
 *  CB-6329 Delete unused info-utils.js
 *  CB-6329 Clean-up of cordova info changes previously merged.
 *  CB-6329 improve 'cordova info' command
 *  CB-5847 strictSSL is no longer ignored
 *  CB-6432 pre_package hook does not populate %CORDOVA_PLATFORMS%
 *  Revert "CB-6267 Windows8. Apply BackgroundColor from config.xml"
 *  Recreate "platforms" dir if it was deleted.
 *  CB-5093: Add versionCode and CFBundleVersion during prepare
 *  CB-6312 Use "landscape" instead of "userLandscape" in AndroidManifest.xml
 *  CB-6421: Move tests from e2e to spec - cli test
 *  CB-6421: Move tests from e2e to spec
 *  CB-6421: Move tests from e2e to spec
 *  CB-6377 superspawn: always wrap non .exe with spaces to cmd with /s /c
 *  CB-6245 Incremented package version to -dev
 *  updated plugman reference in shrinkwrap
 *  Revert "CB-6245 Incremented package version to -dev"
 *  CB-6245 Incremented package version to -dev
 *  CB-6245 Updated version and RELEASENOTES.md for release 3.4.1-0.1.0
 *  updated to use iOS 3.4.1
 *  CB-6377 Fix up superspawn's cmd fallback when there is a space in the args
 *  Fix having a space before the closing quote in superspawn log message
 *  CB-6377 Remove windowsVerbatimArguments from superspawn
 *  CB-6344 Fix spy to return a default platform JSON instead of an empty object
 *  CB-6382 platform list: sort output
 *  CB-6377 Handle spaces in paths for cmd related scripts
 *  CB-6292 Actually add a comment (meant to be a part of prev. commit)
 *  CB-6292 Add a callback-based API for cordova info (in addition to promise API)
 *  CB-6292 Revert commits that add explicit callbacks to APIs
 *  CB-6322 Simplify platforms/platform code for platform specifics
 *  README.md: Getting Started guides link was broke. Fix.
 *  Make "cmd" executed more readable.
 *  CB-6141 Fix Windows 8 tests
 *  Use smarter BOM-skipping logic when parsing XML.
 *  Revert "[CB-6296] implemented tests for return interface of create function"
 *  CB-6357 minor style changes
 *  CB-6357 platform: fix indentation
 *  CB-6357 platform check: sort output
 *  CB-6357 platform check - install each platform to determine working + version number
 *  CB-6357 call_into_create: support no output
 *  CB-6357 platform: provide exports for functions
 *  CB-6357 platform: Refactor into distinct functions
 *  CB-6338 Improve error for missing template
 *  CB-6337 Print nice error when cordova-cli hits various expected things
 *  This closes issue 147
 *  CB-6267 Windows8. Apply BackgroundColor from config.xml
 *  CB-6338 Improve error for missing template
 *  CB-6030 - Automatically increment port for serve when default is in use
 *  CB-6337 Print nice error when cordova-cli hits various expected things
 *  CB-6323 Fix harmless typo in superspawn (cmd -> c)
 *  CB-6323 Fix superspawn's resolve function on windows (was very broken)
 *  CB-6306 Error creating project when path to project includes spaces
 *  Tweak error message when hooks fail (wasn't showing correct command)
 *  [CB-6296] implemented tests for return interface of create function
 *  [CB-6296] callback/promise interface implemented
 *  [CB-6293] additional tests for run command
 *  [CB-6293] dual return method implemented in run
 *  [CB-6293] dual return method implemented in run
 *  [CB-6292] tests for build function's dual return method
 *  pwd
 *  [CB-6238] minor fix, removed echo statements from bash hook tests
 *  updated jasmine dependency for timing
 *  CB-6211 'cordova info' command fixed for Windows platform
 *  Fix prepare command from hiding failures.
 *  Fix ConfigParser.getPreference error + tests
 *  CB-6209 Uplevel changes from android_parser to amazon_fireos_parser Added orientation related config changes from android_parser.
 *  Fix tests broken by recent change to searchpath.
 *  CB-6147 Enable CLI and Plugman with npm shrinkwrap
 *  When searchpath is specified in config and CLI, merge them.
 *  Add --searchpath to help.txt
 *  Fix node-style-callbacks form of the CLI api not passing through results.
 *  CB-6115 Incremented version to -dev
 *  CB-6115 Updated version and RELEASENOTES.md for release 3.4.0-0.1.3
 *  CB-6115 Incremented version to -dev
 *  CB-6115 Updated version and RELEASENOTES.md for release 3.4.0-0.1.2
 *  Add a LICENSE file
 *  Add NOTICE file
 *  CB-6120 `cordova platform` should not fail when version script fails.
 *  CB-6115 Incremented plugin version to -dev branch.
 *  CB-6115 Updated version and RELEASENOTES.md for release 3.4.0-0.1.1
 *  CB-5647 Delete .staging directory if one is found (no longer used).
 *  CB-5647 Remove concept of .staging dir & install directly to www/
 *  CB-5299 Speed up prepare by using plugman's new reapply_global_munge()
 *  Refactored config_parser.js to simply both it and its tests. Details:
 *  CB-6076 Make "Generating config.xml from defaults" a verbose log
 *  Remove a case of improper re-throwing of an error (and removing stacktrace)
 *  CB-5181 Use spawn helper in platform.js
 *  CB-5885 Remove no-longer-necessary iOS project file cache from CLI.
 *  CB-5181 Use spawn helper in hooker.js. Catch error event in spawn helper.
 *  CB-5181 Use spawn helper in emulate.js and run.js
 *  CB-6049, CB-5181 Enable stdio for build sub-commands & add a spawn() helper.
 *  CB-5875 Updated version and RELEASENOTES.md for 3.4.0-0.1.0
 *  set to rc.2
 *  CB-5638 Clean-up: remove unreachable info case from function
 *  Fix spelling of user output when launching app
 *  CB-5937 "platform check" command: print confirmation when there are no stale platforms.
 *  CB-5937 Add "platform check" command: Shows platforms that are out of date
 *  CB-5634 Minor refactoring + tests for Android's orientation preference.
 *  CB-5634 Set Android orientation from config.xml
 *  Fix typo in hooks-README.md
 *  Upleveled amazon_fireos_parser. Making it at par with android_parser.js
 *  updated version in prep for 3.4.0
 *  Unrevert "Add a check to config_parser that root tag is <widget>."
 *  Revert "updated platform.js to point to 3.3.0"
 *  updated platform.js to point to 3.3.0
 *  CB-5992: reverting commit until 3.4.0
 *  Revert "Add a check to config_parser that root tag is <widget>."
 *  CB-5947 Throw when trying to create project inside custom www.
 *  CB-4153 Update help.txt about --source -> --copy-from
 *  Revert "CB-5962 Change platforms.js to point back to 3.3.1"
 *  2015 -> 2014 in RELEASENOTES
 *  CB-5962 Change platforms.js to point back to 3.3.1
 *  CB-5962 Incremented plugin version to -dev branch.
 *  CB-5962 Set version to 3.3.1-0.3.1
 *  Curate up release notes & add 3.3.1-0.3.1
 *  CB-4153 Change to --copy-from and --link-to instead of --src and --link.
 *  updated version file
 *  updated release notes
 *  updated to 3.4.0-rc.1
 *  added firefoxos to readme
 *  updated release notes
 *  Setting version to 3.3.1-0.3.0; updated plugman reference to 0.19.0
 *  CB-5913 Fail more gracefully on Windows when symlinks fail.
 *  Fix isWindows check in util.js to support win64
 *  CB-5907 Make `cordova update` get version from platform's version script
 *  Fix tests (sorry)
 *  Fix serve command when config.xml is in the root (not within www/)
 *  CB-3612 Don't pass --device to "run" command by default. Update help text
 *  CB-5493 lazy_load now downloads to a temp dir and then moves.
 *  CB-5782 Use CordovaError wherever relevant.
 *  CB-5590 Have config.xml version map to CFBundleShortVersionString instead of CFBundleVersion
 *  CB-5782 Add a derived exception class for better error reporting in CLI
 *  added firefoxos to readme
 *  updated release notes
 *  Setting version to 3.3.1-0.3.0; updated plugman reference to 0.19.0
 *  CB-5913 Fail more gracefully on Windows when symlinks fail.
 *  Fix isWindows check in util.js to support win64
 *  CB-5907 Make `cordova update` get version from platform's version script
 *  Fix tests (sorry)
 *  Fix serve command when config.xml is in the root (not within www/)
 *  CB-3612 Don't pass --device to "run" command by default. Update help text
 *  CB-5493 lazy_load now downloads to a temp dir and then moves.
 *  CB-5782 Use CordovaError wherever relevant.
 *  CB-5590 Have config.xml version map to CFBundleShortVersionString instead of CFBundleVersion
 *  CB-5782 Add a derived exception class for better error reporting in CLI
 *  util.isRootDir check for platforms/
 *  CB-5299 Cache pbxproj to avoid re-parsing it for each plugin.
 *  CB-5813 Fix missing quotes on update and ls commands
 *  Bump node-xcode version
 *  Add a verbose log when running update command
 *  CB-5808 Fix lazy_load stripping off windows drive letters
 *  Expose util.isCordova as cordova.findProjectRoot()
 *  Allow lazy_load libs to work without an id and version for local paths.
 *  Add an option to config.js to not write config.json during create.
 *  CB-5802 Updated version and RELEASENOTES.md for release 3.3.1-0.2.0
 *  CB-5006 Fix searchpath not being passed to dependent plugins.
 *  Fix move from lodash->underscore where underscore doesn't have "merge"
 *  CB-5777 Fix "platform update" not updating cordova.js
 *  CB-5006 Plumb --searchpath into cordova plugin add
 *  Forgot to remove hard-coded debug path in previous commit.
 *  CB-5764 Move hooks/ to top-level instead of under .cordova
 *  CB-5765 Identify root project folder using www and config.xml instead of .cordova
 *  Update xcode npm dependency version now that pull request is merged.
 *  CB-5763 Don't write out empty config.json files.
 *  CB-4910 Don't save id and name in config.json.
 *  CB-4871 Make some dependencies have same versions as those in plugman
 *  Remove unused require
 *  CB-4871 Add spec, e2e to .npmignore
 *  CB-4871 lodash->underscore since underscore is smaller in node_modules
 *  CB-4871 Use npmconf instead of npm as a dependency in CLI
 *  CB-4871 Switch to plist-with-patches to save ~10meg of test files in node_dependencies.
 *  CB-4871 Delete ripple command.
 *  CB-4871 Remove unused dependencies in CLI (take 2)
 *  Revert "CB-4871 Remove unused dependencies in CLI"
 *  CB-4871 Remove jshint dependency.
 *  CB-4871 Remove unused dependencies in CLI
 *  Update node-xcode dependency to 0.6.6
 *  CB-5735 Don't write out id & name if config file already exists
 *  CB-4910 Default config.xml to the root instead of within www/
 *  CB-4976 Don't fire download hooks for local paths in lazy_load
 *  CB-4976 fix tests to handle local dir case
 *  CB-4976 dont use cache for local directory
 *  Revert "CB-4976 - dont use cache for local custom lib"
 *  Files in merges must remain intact when removing platform
 *  CB-4976 - dont use cache for local custom lib
 *  Fix broken tests (whoops)
 *  CB-5715 Pass --cli flag to android create script
 *  CB-5397 Add --cli flag for iOS's bin/create
 *  Revert "CB-5397 Make iOS project file's www/ and config.xml point at the non-platforms versions."
 *  CB-5397 Make iOS project file's www/ and config.xml point at the non-platforms versions.
 *  Remove dead code
 *  Add a check to config_parser that root tag is <widget>.
 *  CB-4153 Add --src & --link to cordova create.
 *  CB-5648: clarify comments for the parms
 *  CB-5688: found same problem with "cordova plugin"
 *  CB-5688: check for required args
 *  CB-5687 Teach util.isCordova about PWD.
 *  updated to 3.3.1
 *  CB-5674 Don't install plugins in parallel when adding a platform.
 *  CB-5667 Skip over non-executable hooks in non-windows environments.
 *  CB-4748 Fix typo causing create command to not check for existing directory.
 *  Add RELEASENOTES for 3.3.0-0.1.0
 *  CB-5640 Bump version for republishing
 *  CB-5223 Tweak log messages for "Downloading" vs "Installing".
 *  CB-5347 Handle dangling platform symlink in cordova platform add
 *  updated to 3.3.0
 *  ubuntu install instructions update (bis repetitam)
 *  ubuntu install instructions update
 *  ubuntu install instructions update
 *  ubuntu install instructions update
 *  added deprecation notice about wp7
 *  updated plugman version to 0.17.0
 *  CB-5573 relies on stderr content and error codes to detect a problem with xcode installation.
 *  CB-5330: Fix hooks test on windows, move to e2e.
 *  Moved hooker.spec.js to e2e
 *  CB-4382: Pass cli arguments to project-level hooks
 *  CB-5619 Avoid Error: Error ...
 *  CB-5613 Never hide stack trace on uncaughtExceptions.
 *  CB-5613 use throw Error to include stack information for -d
 *  CB-5614 Include path to file when config.xml fails to parse
 *  CB-5499 added config_xml method to wp7 exports, and added tests for wp7+wp8
 *  updated to 3.3.0-rc.1
 *  Document the new Ubuntu support
 *  updated package.json to use the latest plugman
 *  CB-5619 Avoid Error: Error ...
 *  CB-5613 Never hide stack trace on uncaughtExceptions.
 *  CB-5613 use throw Error to include stack information for -d
 *  CB-5614 Include path to file when config.xml fails to parse
 *  CB-5499 added config_xml method to wp7 exports, and added tests for wp7+wp8
 *  updated to 3.3.0-rc.1
 *  updated package.json to use the latest plugman
 *  Document the new Ubuntu support
 *  make sure the prepare step works in ia32 machines
 *  Fixes to e2e tests: args[0] bug, corodva -> cordova
 *  CB-5362 blackberry parser: support local cordova-blackberry
 *  CB-5348 Minor tweaks to cordova help
 *  CB-5345 Add pre_package event for windows8 parser.
 *  update_csproj was called twice, once from update_project and once from update_www
 *  CB-5343 Tell people to run npm install when requirements are missing
 *  CB-5325 Improve README
 *  CB-5311 windows: Provide cmd script so top level node commands run smoothly
 *  CB-5248 Fix cordova create directory_name com.example.app AppName extra_arg
 *  updated check reqs to say amazon fireos
 *  Fixed CLI error while adding amazon-fireos platform.
 *  updated platforms.js to include fireos
 *  Added check for awv_interface.jar existance.
 *  Added amazon-fireos platform. making cli test 'platform ls' pass. Added amazon-fireos platform in the list.
 *  Fixed CLI error while adding amazon-fireos platform.
 *  updated platforms.js to include fireos
 *  Added check for awv_interface.jar existance.
 *  Added amazon-fireos platform. making cli test 'platform ls' pass. Added amazon-fireos platform in the list.
 *  Fixed CLI error while adding amazon-fireos platform.
 *  updated platforms.js to include fireos
 *  Added check for awv_interface.jar existance.
 *  Added amazon-fireos platform. making cli test 'platform ls' pass. Added amazon-fireos platform in the list.
 *  updated ubuntu to use apache repos
 *  add ubuntu to platform.spec list
 *  platforms now points to apache to grab cordova-ubuntu
 *  add ubuntu platform
 *  platforms now points to apache to grab cordova-ubuntu
 *  add ubuntu platform
 *  updated to 3.2.0-0.4.0
 *  CB-5034 add registry info to README
 *  Make sure errors during prepare are reported
 *  CB-5031 Add CLI help text for platform update and plugin search
 *  CB-5298 Remove redundant requirements check for iOS and Android. The bin/create scripts check.
 *  windows8. fixes version number parsing logic
 *  removed 'win-test' fixture, e2e runs fine on windows now.
 *  [CB-4472] Fix tests broken by previous commit.
 *  CB-4472 Remove <preference> from template config.xml
 *  Update release notes
 *  Update version to 3.2.0-0.3.0
 *  Fix e2e tests on Windows
 *  Revert "fixed merge conflict due to e2e"
 *  CB-5501 fix blackberry10 platform
 *  [android] fixing failing android parser spec tests.
 *  [android] call out to platform check_req script
 *  bumped version to correct npm published version
 *  fixed merge conflict due to e2e
 *  skip hooker.spec expects if running on win32. until someone fixes these tests, they are simply skipped over.
 *  added win-test to be run on windows, which does not include e2e tests which have multiple failures on windows.
 *  Fix comments left over from debugging.
 *  Add plugin test
 *  Minor fixes in create.spec.js
 *  Add test for "create" command.
 *  Much more complete 'platform' command integration tests.
 *  First pass of platform integration test.
 *  Skeleton of e2e tests in place.
 *  fixed failing tests recently introduced with Windows8 parser changes
 *  Update tests to match improvements
 *  Update parsers to match new libDir returned by lazy_load
 *  Remove platform check in platform add and update
 *  Make lazy_load method aware of subdirectory field
 *  Append subdirectory for concerned platforms
 *  correctly resolve file/directories using fs provided methods
 *  Update wp7_parser.js
 *  Update wp8_parser.js
 *  CB-5485 fixed issue with use of cordova cli api, if cordova.config is called before cordova.create, the create command failed. Now, project directory must not exist, or only contain the .cordova config file.
 *  removes traling spaces when reads author from config.xml
 *  Rewrite properties set, to better match project code style
 *  Allow version string to have 1, 2, 3, or 4 part numbers
 *  Improve fix version method
 *  Update appxmanifest properties' DisplayName and PublisherName
 *  Append author property to config_parser
 *  Update Identity.Name in package.appxmanifest
 *  Fix version and Id in package.appxmanifest
 *  Add BOM to files to ensure app pass store certification
 *  CB-5350 Windows8 build fails due to invalid 'Capabilities' definition
 *  CB-5340 Windows8 build does no write cordova_plugins.js
 *  CB-5337 Windows8 build fails due to invalid app version
 *  CB-5321 Windows8 custom_path is not correctly resolved by CLI
 *  CB-5467: CLI: cordova platform add blackberry10 blocked
 *  updated to 3.2.0-0.1.0
 *  add the output of the plugman results to the console
 *  CB-5363 Improve config_json error reporting
 *  CB-5364 config_parser - check for null element text
 *  Fix issue not finding platform script when in subdir - check platforms which have subdir - append subdir to libDir for detected platforms
 *  CB-5377 serve: should only indicate listening when it is
 *  CB-5368 Cordova serve deflate content breaks IE
 *  Change cordova serve's project.json to include etags.
 *  CB-5280 Update serve's help text to remove platform arguments
 *  CB-5364 config_parser - handle duplicates with children and text when merging
 *  changed rc version based off semver
 *  updated version for 3.2.0-0.0.0 rc testing
 *  CB-5320 Document avoiding sudo
 *  CB-4400: cd to project root in most cordova commands.
 *  CB-5063: Revert to copying cordova.js before user www dir
 *  fix 3 failing tests for windows8 and wp8 and add assertions for wp7 too.
 *  Adding instructions for installing on master.
 *  CB-5063: Keep cordova.js in platform_www to avoid copying it from lib.
 *  Remove accidental console.logs in the tests.
 *  CB-5307: Remove references to Callback and Incubator
 *  tests were failing attempting to match lib/dir and lib\\dir on windows
 *  CB-5183 WP7/8 lib path is not correctly resolved by CLI (additional changes)
 *  CB-5283 Improved cordova serve message to be more descriptive
 *  [CB-4866] Execute hooks in ascending order of any leading numbers
 *  [CB-5143] Locate the actual Android app .java file much more carefully.
 *  Cleaning up wp7+8 parsers' use of promises. Fix tests.
 *  serve: Fix doRoot() not being called & remove duplicated table.
 *  serve: provide basic entry point
 *  Code style (indentation)
 *  Wait for the pre_package event to finish, or the update_csproj function might give unexpected results. Fixes both the wp7 and wp8 parser.
 *  Add pre_package event to wp8 project
 *  readability + code quality in wp7+8 parsers
 *  CB-5183 WP7/8 custom_path is not correctly resolved by CLI
 *  [CB-4994] Update xcode dependency to handle Xcode 5 capabilities.
 *  [CB-5220] "An error occurred" is missing an "A" ...
 *  [CB-5197] Updated version and RELEASENOTES.md for release 3.1.0-0.2.0
 *  increased version of plugman to 0.14.0 in package.json
 *  CB-5187: remove unused var os_platform
 *  CB:5187 on node  windows broken compile, emulate, run
 *  [CB-4976] Don't symlink into ~/.cordova/lib for local libs
 *  [CB-5142] improve grammar of emulate description
 *  [CB-5147] emulate needs a space before error message
 *  CB-5125 add tests for chil process spawn
 *  CB-5125: replace child process exec with spawn
 *  CB-4748: Fail quickly if dir passed to cordova create is not empty.
 *  CB-5106: removed flood of cp error messages when running tests
 *  CB-5106:[wp7] fixed broken wp7 tests
 *  CB-5106:[win8] fixed tests for windows 8
 *  Using .find to grab visualelements instead
 *  CB-5066: fixed issue with visual elements not being referenced correctly
 *  windows8: remove debug console.log
 *  windows8: fixed project parser issue, and updated tests
 *  Update tests for commit d1c8024: update_project() should not call update_www() directly
 *  begin firefoxos tests
 *  CB-5066: dealing with windows8 issues
 *  config.xml helper function is used, removed error merge of wp folder.
 *  CB-5066: continuing merge of windows 8 stuff
 *  CB-5066: merged in windows 8 support into master from cordova-3.1.x
 *  config.xml helper function is used, removed error merge of wp folder.
 *  CB-5066: continuing merge of windows 8 stuff
 *  CB-5066: merged in windows 8 support into master from cordova-3.1.x
 *  CB-2234 Add 'cordova info' command
 *  CB-4774: Copy www assets before running plugin prepare
 *  cordova help should return a Q. fixes CB-5070
 *  updated to a version greater than our latest version on npm
 *  added not about platform+os restrictions
 *  added myself as a contributor, CB-5042 added info on windows8
 *  CB-5067: added exception incase no platform level config.xml or defaults.xml exisit
 *  added temp config path for ffos, fixed wp8 config_xml function
 *  [CB-4774] Updated prepare flow to make platform config.xml a build output   - Adds a new method to manually merge two config.xml files
 *  CB-5032: clarify the help text
 *  [CB-4621] Updating run and emulate commands to always provide default options
 *  Log requests in cordova serve
 *  Make cordova serve ignore dot files.
 *  CB-4957: added fix for FFOS
 *  Update "cordova serve" to work with promises refactoring
 *  [CB-4774] Display proper error if cordova prepare run not in project dir.
 *  Fixes a bug where cordova prepare bombs on a config missing a content element   - Changes an undefined check to falsey to cover random null value     returned from elementtree
 *  Bumping elementtree version to 0.1.5 to match plugman and support namespaced xml elements
 *  Fix cli.js tests broken by --silent change.
 *  [CB-4877]: Add basic logging, --silent flag.
 *  Fix busted test.
 *  First pass
 *  [CB-4883]: Graceful handling of lazy loading errors.
 *  reapplied change to add event mid build to allow mods to www folder pre_package  aka 775e969f9cc27a580123897d922121d564d4554d
 *  Remove two debugger; lines that snuck in.
 *  [CB-4604] Execute hooks directly (not .bat files) cross-platform
 *  Refactor to use Q.js promises in place of callbacks everywhere.
 *  [CB-4837]: Version 3.0.10. Depends on Plugman 0.12.x.
 *  Add missing license headers
 *  Update repo versions to 3.1.0-rc1
 *  Add `cordova update foo` command, with tests. [CB-4777]
 *  Add version numbers to `platform ls` output.
 *  [CB-4545] support for merges directory on both wp7 & wp8
 *  Rename CHANGELOG.md -> RELEASENOTES.md
 *  Fix expectation for platform ls test, for firefoxos
 *  Fix platforms.js: firefoxos.parser
 *  CB:4657 added ffos support to cli
 *  CB-4657: added staging_dir function to ff parser
 *  add default manifest properties for firefox os platform
 *  make the firefoxos parser actually build the project
 *  change firefoxos link to tarball
 *  add firefox platform
 *  [CB-4797] Fix a crash on undefined platform in path.
 *  [CB-4797] Add missing return statement in cordova serve
 *  Fix broken tests due to lazy requiring change.
 *  [CB-4797] Change `serve` command to serve platforms keyed off of path component.
 *  [CB-4793] Lazily require modules in some places.
 *  [CB-4325] Run platform installs in serial instead of in parallel
 *  Version updated to 3.0.10-dev
 *  [CB-4751] Updated version and changelog for 3.0.9
 *  [CB-4184]: Install plugins to platforms serially, not in parallel.
 *  Fix broken tests for platform ls after my recent change.
 *  [CB-3904]: platform ls now shows installed and available platforms.
 *  [WP8] add all files from www dir in actual project directory, not the common one (required in order to respect files from merges)
 *  3.0.8
 *  3.0.7
 *  [BlackBerry10] Fixed issue calling check_reqs script with space in path
 *  CB-4651: Allow default project template to be overridden by config.json
 *  [CB-4618] fix for xml parsing on windows, use xml-helpers from now on to parse xml
 *  [CB-4570] [BlackBerry10] Updating the parser not to overwrite config.xml
 *  [CB-4484] Do not force www app contents to come with an index.html.
 *  3.0.6
 *  [CB-4572] Create parent dir for lazy_loaded local lib
 *  3.0.5
 *  [CB-3191] Support for <content> tag in windows phone platforms.
 *  [CB-3191] Support for <content> tag (start page declaration) in BlackBerry10.
 *  [CB-3191] Updated README to reflect <content> tag support. Added support + specs for ios.
 *  Added tyrion to contributor list.
 *  [CB-3191] Added specs for config_parser changes to include <content> tag support. Updated stock template.
 *  Added partial support for "content" tag in config.xml "cordova prepare" now correctly handles the <content> tag. Android only.
 *  [CB-4532] Changes the CLI to only use optimist for verbose and version - Also adds limited unit tests for the CLI module
 *  support for merges directory in wp8
 *  [CB-4511] [BlackBerry10] Fix parser handling of config.xml
 *  [CB-4200] Add Bash command-line completion
 *  Add command-line completion script, with installation docs
 *  bumped to plugman 0.10.0. added optimist. refactored cli shim into own module.
 *  [CB-4273] Allows arguments pass-through to platform scripts - Splits platforms from options in the bin/cordova script effectively   changing the JS interface
 *  Changed references to windows phone repo from wp8 to wp
 *  [CB-4429] Fixed platform add for lazy loaded wp7
 *  On lazy load error, rmeove any created directories.
 *  adding latest plugman and bumping version
 *  updating plugman version and bumping version
 *  updating plugman version
 *  Updated README to include windows phone requirements
 *  added rubennortes email to contributor list.
 *  added @rubennorte to contributors list.
 *  Added a spec for [CB-4376].
 *  [CB-4376] Read config.xml after "before prepare" hooks being executed.
 *  adding fetch/search from registry and bumping version
 *  [CB-4322] Use npms proxy configuration (if set) in the lazy load module. Added proxy verbiage to README. Bumped dependency on plugman to 0.9.11. Bumped version to 3.0.1.
 *  3.0.0!
 *  3.0.0rc1-3. plugman dep bumped to 0.9.10.
 *  [CB-4286] rearranged
 *  [CB-4286] changed heading types from # to ##
 *  [CB-4286] Added known windows issue to README.md
 *  3.0.0rc1-2. Bumped plugman to 0.9.9.
 *  3.0.0rc1-1. bumped plugman dependency to 0.9.8. Fixes [CB-4283]
 *  added supported platforms to readme.
 *  [CB-4128] Change blackberry platform label to blackberry10.
 *  bumped plugman dep to 0.9.7 and set version to 3.0.0rc1
 *  [CB-4270] [BlackBerry10] Remove custom emulate logic (moving to cordova-blackberry)
 *  [CB-4268] [BlackBerry10] Remove custom BB run logic (moving to cordova-blackberry)
 *  updating lib refs to 30.0.rc1
 *  [CB-4207] Support for custom lib in windows.
 *  2.9.7
 *  Revert "[CB-4270] [BlackBerry10] Remove custom emulate logic (moving to cordova-blackberry)"
 *  Revert "[CB-4268] [BlackBerry10] Remove custom BB run logic (moving to cordova-blackberry)"
 *  Fix for check_requirements function wrapper around errors.
 *  [CB-4270] [BlackBerry10] Remove custom emulate logic (moving to cordova-blackberry)
 *  [CB-4268] [BlackBerry10] Remove custom BB run logic (moving to cordova-blackberry)
 *  [CB-4267] [BlackBerry10] Fix callback chain for build
 *  2.9.6
 *  [CB-4261] Add and test success callbacks for plugin commands.
 *  [wp-parsers] fixed deletion of cordova.js reference from .csproj
 *  [windowsphone] Add www contents from root www folder indead of the project one
 *  2.9.5
 *  Added confix_xml function to windows phone parsers
 *  re-enabling ripple
 *  2.9.4. Bumped request dep version from 2.12.x to 2.22.0.
 *  updated plugman dep to 0.9.3
 *  [CB-4077] updating plugman version to 0.9.0.
 *  [CB-4077] Fix tests for cordova-cli
 *  [CB-4077] Separate the actions of removing a plugin from a platform and removing the plugin entirely
 *  2.9.3
 *  [CB-4182] Delay in lazy load module. Simplified with a stream implementation.
 *  adding search and fetch
 *  [CB-4148] Changing application name for ios needs to update all references to app name in native ios projects.
 *  2.9.2. [CB-3931] Should ignore "CVS" folders for adding plugins.
 *  Merge master2->master
 *  Added missing bin scripts to windows phone
 *  Version 2.7.4
 *  [CB-3457] Fix Android to support dash in widget id.
 *  [CB-3419] Change plugin XML namespace to cordova.apache.org
 *  Version 2.7.3
 *  Add Windows support to Android platform-scripts.
 *  Add WP7 and WP8 support to cordova-cli.
 *  Add WP7 and WP8 platform files.
 *  Reorganize specs into cordova-cli/ and platform-script/
 *  Revert merge branch 'future' into 'master'
 *  Version 2.7.0 (npm 2.7.2)
 *  [CB-3238] Update cordova-blackberry to 2.7.0
 *  [CB-3238] Update cordova-android to 2.7.0
 *  [CB-3238] Update cordova-ios to 2.7.0
 *  [CB-3228] Fix 'cordova build blackberry' to use cordova.js
 *  [npm] Version 2.7.1-rc.1
 *  [CB-3227] Fix missing build script in iOS project.
 *  Version 2.7.0-rc.1
 *  CB-3183 handle missing plugins directory
 *  [npm] Version 2.6.2
 *  [npm] Version 2.6.1
 *  [issue 3050] Add cordova.platform.support(name, callback).
 *  [src] Remove unused platform parsers from compile command.
 *  updated version to 2.6.0
 *  CB-2811: shell and module-level hooks should receive project root as parameter.
 *  2.6.0rc1 used for libs now. Bumped npm version to 2.6.0. added androids local.properties to gitignore.
 *  Version 2.7.0 (npm 2.7.2)
 *  [CB-3238] Update cordova-blackberry to 2.7.0
 *  [CB-3238] Update cordova-android to 2.7.0
 *  [CB-3238] Update cordova-ios to 2.7.0
 *  [CB-3228] Fix 'cordova build blackberry' to use cordova.js
 *  [npm] Version 2.7.1-rc.1
 *  [CB-3227] Fix missing build script in iOS project.
 *  Version 2.7.0-rc.1
 *  CB-3183 handle missing plugins directory
 *  [npm] Version 2.6.2
 *  [npm] Version 2.6.1
 *  [issue 3050] Add cordova.platform.support(name, callback).
 *  [src] Remove unused platform parsers from compile command.
 *  updated version to 2.6.0
 *  CB-2811: shell and module-level hooks should receive project root as parameter.
 *  2.6.0rc1 used for libs now. Bumped npm version to 2.6.0. added androids local.properties to gitignore.
 *  Access config.xml from serve. Serve from platform dir only
 *  Fix `cordova prepare` now that plugin assets are copied on (un)install
 *  using plugman as a lib and updating package.json to use npm version
 *  Chaning plugman.js to main.js as run target
 *  [CB-3057] Change iOS platform to default to ARC.
 *  Fix 'plugin add' tests
 *  Move www/ and merges/ into app/.
 *  Install all installed plugins into a newly added platform
 *  No <platform> tags for JS-only plugins.
 *  Fix cordova plugin add with trailing slash
 *  Use the new style of plugman commands
 *  Make cordova plugin add rely on plugman
 *  Remove plugin_loader. prepare now calls plugman --prepare
 *  Tighter Ripple Ingeration
 *  Added prototype ripple support to command line.
 *  CB-2628: add link to getting started guides to readme.
 *  Update project path in example section
 *  Set missing create options
 *  [CB-2733] Consistently throw an Error object.
 *  CB-2702: show warning in bootstrap whenever root user is used to install, regardless of location of install.
 *  2.5.5
 *  Handle spaces in emulate command.
 *  [CB-2635] Prevent console output in BlackBerry Parser tests.
 *  2.5.4. removed an accidental checkin for local.properties
 *  plugin add/rm no longer change top-level www
 *  Automatic Javascript installation on prepare
 *  2.5.3. added temp and fixture dirs to npmignore. this reduces npm payload from 60MB to 18MB.
 *  2.5.2 package.json version.
 *  Added Michael Wolf to committers list, expanded on "merges" functionality in README
 *  test fixes and convention  tweaks following merging in "merges" functionality
 *  Revert "Revert "added merges to base cli documentation""
 *  Update .gitignore
 *  added merges to base cli documentation
 *  added merges to base cli documentation
 *  added merges tests
 *  shifted the update_overrides method out of build and into the parsers
 *  addition of merges functionality
 *  2.5.0 (2.5.1 for npm). Uses ios, android, blackberry v2.5.0 now.
 *  Remove mention of specific cordova version from README, add requirement for xcode + cli xcode tools.
 *  Small readme tweak.
 *  2.5.0rc1 (2.5.0 in package.json). Removed old test related to webworks scripts. Updated lbiraries to 2.5.0rc1. Added a VERSION file.
 *  2.4.10
 *  woops syntax error in package.json
 *  CB-2445: detect global installs into root-only locations a bit more robustly. Warn noisily if this is so and provide specific instructions on how to fix.
 *  Added Tim to contributors list.
 *  No need to inject webworks.js script anymore
 *  2.4.9. Fixed an issue where .gitignore was treated as a platform, added a utility "listPlatforms" function as a result. Fixed emulate specs following making a callback mandatory for all project parser update_project methods.
 *  Create now adds directories for prepapre+compile hooks.also added tests fro this.
 *  2.4.8. Fixed a bug where i hardcoded a path. baaad. added test for it.
 *  2.4.7. Fixed CLI tools since addition of compile + prepare commands (callbacks were not nested properly). Fixed tests since addition of compile + prepare commands. Rolled back jasmine version since there are issues in 1.2.x. Removed ./bin/notice and put it into bootstrap (for better windows support).
 *  Update README for prepare and compile.
 *  Separate build into prepare and compile.
 *  better errors in ios min checks
 *  Also adding output to error reporting for android min checks
 *  also getting rid of unsafe. not needed.
 *  2.4.6. Adding output of xcode min reqs failing.
 *  2.4.5. trying out the "unsafe-perm" config flag to fix permission weirdness
 *  package.json @ 2.4.4. tag for 2.4.0
 *  updating blackberry to 2.4.0
 *  updating to cordova-ios 2.4.0
 *  updating to cordova-android 2.4.0
 *  2.4.3. Fixes with plugins. Tests are faster. woot.
 *  typo in help menu
 *  sped up emulate tests
 *  tests redone for build
 *  bumped up to shelljs 0.1.2
 *  setting ios scripts to executable
 *  more work for making tests fast
 *  sped up platform tests!
 *  fixes for at est cleanup
 *  tweaked up tests for project parsers.
 *  speeding up parser specs. refactoring a bit for tighter/clearner/faster tests.
 *  using cli tools, bootstrap now creates a project for use as text fixtures on install. bootstrap now uses the check_requirements function for platform-specific req checks on install as well. removed old cordova project fixture that was "manually" added.
 *  CB-2294: when adding platforms, the stock app assets would be left in the platform artifacts.
 *  CB-2219: moved "check requirements" type stuff into indiv platform handlers. removes dependency on android stuff on-install.
 *  CB-2299 part 2: apache RAT audit for CLI.
 *  CB-2299 part 1: apache RAT audit.
 *  adding npmignore to fix npm installs. removed checked-in local.properties file for android
 *  still trying to figure out issues with installing from npm...
 *  Run android config after install.
 *  Fix for android configuration.
 *  updating project.properties in cordova-android
 *  bumping to 2.4.0 package.json version
 *  support for 2.4.0rc1. "vendored" the platform libs in. added Gord and Braden as contributors. removed dependency on unzip and axed the old download-cordova code.
 *  Updating README to list support for <preference> tags in config.xml
 *  Refix CB-2237: Preferecne support in config.xml. Now doesnt clobber default prefs for android and ios.
 *  Fixes CB-2237: Support for <preference> elements in Android + iOS. Bump to 2.3.5.
 *  Added support for <preference> elements in config.xml (specs included).
 *  Fixes CB-2075: cordova-cli has trouble with projects under svn revision control. Added a "deleteSvnFolders" utility method to help with this.
 *  route "platforms" command to platform, same with "plugins" -> plugin
 *  Fix for CB-2074: problem when running in iPad 6.0 simulator. Empty space, multiline elements in .plist files cannot exist. Bumping to 2.3.3
 *  fixing bad install script again.. bumping to 2.3.2
 *  got rid of old script ref. fixes CB-2182
 *  updates for 2.3.0 support. bumped version. removed checked-in native project fixtures for tests, now on install create fixtures based on actual `create` scripts for platforms.
 *  updating readme
 *  updating version to match cordova versioning, and links to apache
 *  Updated moving of cordova.blackberry.js
 *  bumping to 0.1.14
 *  updating cordova-cli to work with 2.3.00rc1
 *  updating lib locations. bumping cordova to 2.3.0rc1. updating references to pluginstall
 *  Remove commented junk from serve.spec.js
 *  Add spec tests for `serve` command.
 *  Add search paths to `serve`. Add return values useful for testing.
 *  Add `serve` command.
 *  Bump to 0.1.12. Fix to issue 68: can use either `uri` or `origin` attribute to denote domain whitelist (noted as such in readme).
 *  Example hook from @dpogue, thanks buddy. Fixes issue 70.
 *  Attempt for issue 69.
 *  Fix for issue 68, proper support for blackberry-10 whitelist. Bumped npm version.
 *  Fixes issue 65: whitespace <string> elements mess up running on ios simulator.
 *  bumping support for 2.2.0
 *  bump to 0.1.10. Whitelist support added across platforms. Bumped pluginstall dependency to version 0.5.3.
 *  added "remove all access elements" functionality to config_parser. added whitelist support to blackberry
 *  android projects now adhere to whitelist specified by config.xml
 *  ios projects now adhere to whitelist specified by config.xml
 *  adding access whitelist api to config_parser
 *  fixes to plugin failure output
 *  bumping to 0.1.9, and bumped pluginstall dependency to 0.5.2
 *  Fixes issue 61: hook folders that do not exist blow things up. Now ignore hook folders that no longer exist.
 *  Axed "docs" command. Updated example usage in help txt a bit. Fixes issue 59
 *  Fixes issue 57 - issue with folders with spaces in them. Still need to wait for android to fix its debug/cordova scripts for full fix, though.
 *  0.1.8
 *  Fixes for download-based lib pull. gotta chmod all the shizz.
 *  Explicitly fail on platform-add for ios if xcode is not installed or not of minimum requirements. Closes issue 52.
 *  Removed dependency on git (closes issue 55 issue 53 and issue 13). Using request + unzip libs to handle downloading the cordova libs.
 *  adding notice regarding permissions for tool upon install
 *  0.1.6
 *  Fixes issue 47. Removed node-plist as dependency. Used simpler regex to do string/replace.
 *  0.1.5
 *  Update pluginstall + xcode dependencies. Fixes issue 49 and issue 50
 *  0.1.4
 *  Closes issue 21. Support modifying package identifier via config.xml
 *  modifying package name (bundle id) for ios projects.
 *  package id changes supported in android
 *  cleared up platfrom+plugin add/rm multiple commands
 *  0.1.3
 *  better handling of cli params. closes issue 30.
 *  handling multiple platform and plugin add/removes.
 *  updates to specs following default value changes. (issue 42)
 *  worked out the readme regarding hooks/events
 *  Remove weird characters from default package name + app name. Was throwing errors on older macs. Fixes issue 42
 *  landed module-level events/hooks. tweaks to tests
 *  how to submit bugs.
 *  0.1.1
 *  Fixes issue 40: undefined not a function when adding ios (would also apply to adding BlackBerry).
 *  added note about android tools on path to readme
 *  re-added info in readme about permissions for global node modules
 *  readme tweaks and 0.1.0!
 *  plugin hooks
 *  added hooks for build, emulate and platform commands.
 *  basic hook info in the readme
 *  before and after build hooks
 *  added hooker module for handling project-specific before/after hooks
 *  moving to a .cordova directory
 *  readme updates. removed old info. pruned it down so its not so giant. bumped to 0.0.9
 *  Allow specifying one or more platforms to build/emulate. Fixes issue 32. Closes issue 38.
 *  Allow specifying a platform when building.
 *  Added spec tests for the aliased commands.
 *  Allow list and rm as alternatives.
 *  i am a javascript nub.
 *  mike as contributor
 *  Fixes issue 35 Add www/ to Android test fixture.
 *  Correct case for the ncallbacks require.
 *  0.0.8
 *  tests should not test native project specifics, only that lower-level modules (project parsers) are invoked to do their tasks. emulate specs added!
 *  added update_www and update_project methods to project parsers. moved native project specifics to project parser modules (such as retrieving BB env config for deployment).
 *  platforms related to a project are no longer added to config.xml. instead tool looks at dir tree under ./platforms. simpler.
 *  added blackberry shortcut for project creation to speed up specs
 *  updated help txt to reflect -v flag
 *  added -v switch to print version. specs too
 *  build specs for bb10 support
 *  0.0.7
 *  updated test bootstrap + tests for bb10 support.
 *  fixes for bb support
 *  start of bb support. for platform + build commands
 *  blackberry platform support added.
 *  added blackberry project parser + specs in prep for bb support
 *  removing trycatches
 *  added uncaughtException handler rather than abruptly calling process.exit
 *  added check for git command availability. Updated my contact email in the contributors list.
 *  bumping to 0.0.6
 *  Fixes issue issue 26: android 2.1.0 tab breaks create script. also refactored spec helper a bit so that we can turn off the android project create shortcut
 *  swapped out wrench for shelljs
 *  bumped to 0.0.5
 *  Added documentation for plugin removal.
 *  added build command invoking changes to app data via config.xml specs. also added plugin removal and specs
 *  bumping to 0.0.4 and added mike + darryl as contributors
 *  axed asyncblock. tweaked test_bootstrap
 *  removed asyncblock. using shelljs where appropriate.
 *  reworked build flow. build tests now run fast! start of incorporating shelljs
 *  moved lib cloning to util module. `npm test` now makes sure libraries are all cloend down before running tests.
 *  Output indented XML.
 *  modified add platform: created a variable for checkout tag, moved get platform logic to seperate function, added error checking when platform already exists, added error checking for invalid platform name. updated instructions to not install as sudo. changed lstatsync to existsSync
 *  sped up tests by catching calls to android/bin/create at the child_process.exec level. gnarly, but saves test run time by about 50% on my machine
 *  added documentation on how to edit app name via config.xml. related specs to configuring with config.xml
 *  adding ios project parser module and related specs. hooked in config name extraction -> interpolation into native project for ios.
 *  config.xml -> native project configurator modules. moar tests.
 *  add platform config logic made simpler
 *  stub of build specs related to config.xml interpolation. added a bunch of fixtures for tests.
 *  updating package.json to point to anis pluginstall
 *  removing dot file stuff.. unnecessary abstraction.
 *  readme todo updates. now links to github issues.
 *  added a dot parser, start of syncing up config.xml between user and client
 *  .cordova file now a basic manifest
 *  updating (temporarily) github url for project, bumping version for npm publish!
 *  fleshed out plugin addition. tests!
 *  tweaking readme, added a plugin.xml parser module.
 *  Test audit and dropped todo based on ML feedback.
 *  doc tweaks
 *  removing leading $ from CLI examples. updated command formats based on Brian's feedback.
 *  more tweaks, mostly hygiene
 *  merging in changes from Filip, Michal, and Brian
 *  more editing
 *  working on the documentation a bit
 *  dropping todo
 *  Update doc/help.txt
 *  added ios project creation tests
 *  test updates. omg was shooting myself in the foot with jasmine helpers.argh!
 *  java man. wtf
 *  replace non-words in package name with underscore
 *  update android project name on each build
 *  fixed tests. small logic fix. updates to readme
 *  forgot asyncblock function wrapper, updated readme
 *  asyncblock is better. explicitly checks out tag 2.1.0rc1 now after cloning libs.
 *  todos and asyncblock-ing build command to wait for debug cmd to finish
 *  using npm-published version of pluginstall. line drawn in sand regarding minimum cordova version. added asyncblock for flow control. fixed an issue with express deprecation warning.
 *  Add .gitignore.
 *  fixed up tests a bit
 *  Most of the way there for issue 2 (config.xml as user endpoint for modifying app metadata). Fixes issue 6: can specify app name at create time (and optionally id/package name as well).
 *  and tweak expectation to go along with that last change
 *  use exists instead of lstat to check for dir existence. throw instead of console.
 *  proper refactor, express to deps as it was missing
 *  helper file makes this a bit more sane.
 *  commas man. wtf
 *  reasonable timeout values for tests. callback invocation for plugin support. fixing plugin listing issue
 *  Missing platform tag
 *  Issue issue 5: use the hello-cordova sample application
 *  todos, callback for plugin module, moar tests.
 *  On pluginstall, copy in plugin www assets into common project www.
 *  help updates, sped up tests, routing certain calls to null so as to not overload exec buffer.
 *  added plugin stuff to readme
 *  changed command modules to throw, and cli script to handle passing over to console. fixed tests.
 *  plugin support!
 *  pluginstall basics
 *  Copying in common www assets at build time
 *  build and emulate working.
 *  Project creation works.
 *  split out cordova subcommands build and platform into separate files
 *  contribution section to readme
 *  finished off platform specs and impl
 *  split out code into smaller modules, platform command now works. tweaked help txt.
 *  added platform specs and basic work
 *  using wrench, fixed up tests
 *  jasmine, start of www template
 *  tweaks to readme, begone mocha, welcome back jasmine
 *  added docs about docs
 *  added local docs server
 *  this should not be here
 *  gratuitous colors
 *  betterish child process
 *  slightly better help system
 *  build and emulate working
 *  create working w/ new structure
 *  adding placeholder for tests, vendoring the cordova lib, and seperation of cli from module code
 *  adding cordova client code
 *  updating README.rd
 *  updating README
 *  Initial commit
 *  gitignore and test updates
 *  update with latest refactor
 *  First cordova-client commit
 *  Update README.md with project organization.
 *  Update README.md with commit instructions.
 *  Add .gitignore.
 *  added some clarity for those seeking it
 *  Add README
 *  Import plugman history: remove files that will stay in plugman repo
 *  Split out cordova-lib: move cordova-plugman files
 *  CB-6491 add CONTRIBUTING.md
 *  Fix unit tests when running node v0.11
 *  Revert "Merge branch 'master' into browserify"
 *  Remove trailing spaces in all js files
 *  Fix spelling typos
 *  CB-6280: plugman publish now publishes doc/index.md
 *  added basic support for doc/index.md
 *  CB-6178 Plugman does not cache downloaded plugins
 *  fixing empty merges
 *  Use events.emit instead of re-importing plugman each time. Part 2.
 *  Use events.emit instead of re-importing plugman each time
 *  fixing merge with no target
 *  adding message to exception
 *  removing window from target
 *  adding prepare namespace
 *  creating a transform for org.apache.cordova.* modules
 *  adding clobbers/merges support
 *  setting finish event on outputstream
 *  cleanup
 *  fixing path
 *  adding browserify bundle
 *  adding cordova-js as a dependency
 *  adding browserify and through as dependencies
 *  fixing merge with no target
 *  adding message to exception
 *  removing window from target
 *  adding prepare namespace
 *  creating a transform for org.apache.cordova.* modules
 *  adding clobbers/merges support
 *  setting finish event on outputstream
 *  cleanup
 *  fixing path
 *  adding browserify bundle
 *  adding cordova-js as a dependency
 *  adding browserify and through as dependencies
 *  CB-6414 - fixes the config.xml issue with android and ios, correcting the bug at the ConfigKeeper.get method
 *  Removing console.log statement
 *  CB-6414 - fixes the issue where two config.xml munges exists, it will still write the correct config.xml output
 *  Revert "CB-6414 Fixes the issue where two config.xml munges exist, it will still write the correct config.xml output"
 *  CB-6414 Fixes the issue where two config.xml munges exist, it will still write the correct config.xml output
 *  CB-6245 Incremented package version to -dev
 *  CB-6245 Updated version and RELEASENOTES.md for release 0.21.0
 *  CB-6344 Specify after which sibling to add config-changes in plugin.xml
 *  Revert "CB-6344: Specify after which sibling to add config-changes in plugin.xml"
 *  CB-6272 Fix subdir bug + tests & meta fetch with a src directory
 *  CB-6344: Specify after which sibling to add config-changes in plugin.xml
 *  Tizen: Copy platform file verbatim from firefoxos
 *  README.md: Place "Tizen" in alphabetical order
 *  Adding spec for Tizen platform
 *  README.md: Adding Tizen to list of supported platforms
 *  src/platforms.js: Adding tizen.
 *  Throw an error when a <dependency> tag is missing `id` attribute.
 *  Added org.apache.cordova.statusbar into the registry whitelist.
 *  PB-6160 adding plugin fails for Firefoxos.
 *  Fix to never remove top-level plugins that are dependencies + tests.
 *  Improve dependencies tests by grouping with beforeStart() Fix for dependency cycle / throw error.
 *  Refactoring of install & uninstall tests
 *  CB-6147 Enable CLI and Plugman with npm shrinkwrap
 *  Allow --searchpath to have a delimiter
 *  remove console.log, oops
 *  working uninstall for projectReferences
 *  projectReference.uninstall has to generate the plugin_dir because it is not passed to uninstall methods
 *  formatting / readability
 *  CB-5970 added type attribute 'projectReference' to <framework> element to signal addition of dependent project
 *  remove double wip framework element
 *  Separate out adding a dependent project from adding a .winmd reference in windows8
 *  more work on adding project to solution
 *  wip implementing reading guid from 'framework' project
 *  CB-6162 Show a better error message when publish fails the whitelist
 *  CB-6119 Fix `plugman info` command printing "undefined" always
 *  CB-6159 Fix incorrect "success" message when publishing fails.
 *  CB-6115 Incremented plugin version and added -dev.
 *  CB-6115 Updated version and RELEASENOTES.md for release 0.20.2
 *  CB-6151 Fix exception when adding a new platform to a CLI project
 *  CB-6115 Incremented plugin version and added -dev.
 *  CB-6115 Updated version and RELEASENOTES.md for release 0.20.1
 *  Delete poorly written prepare tests that are broken by previous change.
 *  CB-6124 Make `cordova plugin remove` resilient to a missing plugin directory
 *  CB-6028 Protect against cyclic dependencies in install
 *  CB-6128 Treat windows c: absolute paths like file:
 *  removed sloppy console.logs on add/remove sdkRef for windows8
 *  Add a LICENSE file
 *  Add NOTICE file
 *  CB-6123 Fix crash in handleUninstall introduces by recent action-stack refactoring
 *  CB-6122 Fix exception on uninstall due to incorrect require() path.
 *  CB-6115 Incremented plugin version to -dev branch.
 *  CB-6115 Updated version and RELEASENOTES.md for release 0.20.0
 *  CB-5006 Add a cache in searchpath logic.
 *  CB-6076 Log message tweaks.
 *  CB-5647 Move <assets> copying from install to prepare
 *  Oops, I overcommitted
 *  CB-6109 all platforms now implement all tags and do verbose log if the method is called but not supported.  Added tests
 *  CB-6109 Refactored to make ActionStack action calls consistent across platforms, updated tests - all green
 *  fix some readability, refactoring to make action-params consistent coming soon
 *  added SDKReference support via 'lib-file' tags
 *  CB-5804: added platform tag publishing to plugman
 *  deleted empty line
 *  stashing my changes
 *  CB-6088: look for config.xml in www_dir and in project_dir
 *  CB-6076 Tweak logging to be less verbose.
 *  config-changes.js: Address review comments.
 *  config-changes.js: Add reapply_global_munge().
 *  config-changes.js: Rename add/remove_plugin_changes.
 *  config-changes.js: Moved functions into PlatformMunger.
 *  config-changes.js: Moving funcs around.
 *  config-changes.js: Add separate functions to manipulate munge objects.
 *  config-changes.js: Add pbxproj to ConfigKeeper.
 *  config-changes.js: Removed plugins-plist support.
 *  config-changes.js: Minor changes
 *  config-changes.js: Convert remove_plugin_changes() to use PlatformMunger
 *  config-changes.js: Added ConfigFile class to abstract details config files.
 *  config-changes.js: Moved add_plugin_changes() to new class "PlatformMunger".
 *  config-changes.js: require('../../plugman').emit() -> events.emit()
 *  config-changes.js: Some simple changes & moving funcs around for better readability.
 *  config-changes.js: Change to named functions and fix jshint warnings.
 *  config-changes.js: Unindent by one level
 *  Fixed failing tests (windows) android+ios by normalizing paths, removed wp .dll source file tests
 *  Use path.extname instead of string parsing nonsense, remove ability to add .dll as content - it should be a framework/reference
 *  Revert "Merge branch 'tizen' of https://github.com/gabrielschulhof/cordova-plugman"
 *  CB-5885 Speed-up adding multiple plugins with plugman
 *  CB-6025 ios: Do not add static libraries (.a) to source files
 *  Adding spec for Tizen platform
 *  README.md: Adding Tizen to list of supported platforms
 *  src/platforms.js: Adding tizen.
 *  CB-4886 Minor tweaks to Android & iOS plugman create templates.
 *  CB-4886 Initial addition of "plugman create"
 *  Print out only the version number for `plugman --version`
 *  CB-5017 accept proxy config for plugman
 *  CB-5990 Delete unused findPlugins() function
 *  applied same addReference logic to csproj for WP8
 *  cleanup console.log
 *  added ability to add+remove ref to .winmd files
 *  Updated readme to reflect that Windows8 IS supported
 *  CB-5962 Incremented plugin version to -dev branch.
 *  Tweak release notes
 *  CB-5891 Fix engine check when path has spaces.
 *  updated release notes
 *  CB-5804: added repo & issues to plugman publish
 *  CB-5299 Cache pbxproj to avoid re-parsing it for each plugin.
 *  Update node-xcode dependency to 0.6.6
 *  Bump node-xcode dependency version
 *  CB-5802 Updated version and RELEASENOTES.md for release 0.18.0
 *  CB-5006 Fix searchpath not being passed to dependent plugins.
 *  CB-5006 Change searchpath to use repeated flag instead of delimiter
 *  CB-5770 plugman prepare.js script content wrapping no longer allows ending parens/braces to be commented out from end of line comment
 *  Update xcode npm dependency version now that pull request is merged.
 *  Fix-up trailing comma in previous commit :(
 *  CB-4871 Add spec/ to .npmignore
 *  CB-4871 Remove unused dep "ncallbacks", move osenv to devDependencies
 *  CB-4871 Switch to plist-with-patches to save ~10meg of test files in node_dependencies.
 *  CB-5720 Tests and formatting tweaks to <resource-file>
 *  CB-5720 add resource-file to plugin.xml
 *  CB-5006: Add --searchpath option for local plugin search path
 *  White space & style fixes.
 *  CB-5720: emit warning if resource-file is not supported on platform
 *  reverted last change because ios does already support resource-file
 *  CB-5720 add resource-file to plugin.xml for all platforms
 *  CB-5720 add resource-file to plugin.xml
 *  CB-5701 Reference custom frameworks usinexecHelperrelative paths
 *  Add release notes for the last few releases
 *  CB-5495, CB=5568 fix config.xml path for ios
 *  updated version to 0.17.0
 *  CB-5579 Add support for --www param for install, uninstall, prepare commands.
 *  CB-5619 Avoid Error: Error ...
 *  updated to 0.16.0
 *  Updated amazon-fireos.spec with amazon-fireos platform name. Corrected project names for android_one and android_two. Modified README.md for Cordova-AmazonWebView-Plugman
 *  Added amazon-fireos platform.
 *  add ubuntu platform
 *  added battery-status + device-motion to whitelist
 *  CB-5034 document registry functions in plugman
 *  CB-5584 Fix git clone of not working on windows.
 *  CB-5238 fixing typo and updating tests
 *  bumping xcode version
 *  CB-5238 adding custom frameworks
 *  CB-5367 reject non-whitelisted org.apache.cordova plugins
 *  Write plugin metadata (ID and version) into cordova_plugins.js
 *  Revert "Add <plugins> tag to config.xml, containing a list of plugins."
 *  Add <plugins> tag to config.xml, containing a list of plugins.
 *  Fixing plugman tests on Linux.
 *  updated version to 0.15.0
 *  [CB-4994] Update xcode dependency to parse Xcode 5 capabilities.
 *  CB-5091: Use cwd option rather than shell.cd when cloning plugin repos
 *  CB-4872 - updated default engine names to include windows scripts
 *  [CB-5197] Updated version and RELEASENOTES.md for release 0.14.0
 *  CB-5192 Plugman engine check fails on Windows
 *  [CB-5184] Fix uninstall logic being too aggressive
 *  CB-4872 - updated default plugin to include new bb10 script
 *  CB-4872 - took out custom version compare and went back to semver
 *  Overhaul dependency uninstallation
 *  [CB-4872] - deleted some comments
 *  [CB-4872] - adding in custom semver check for project
 *  [CB-4872] - updated paths to version files
 *  Update action-stack to avoid static platform detection + test if parseProjectFile is present instead of switch case + test if project_files is not null instead of [].indexOf + More dynamic, more long term evolution
 *  Update spec to match new ios parse method name
 *  Update references to old ios parse method
 *  Rename parse method and add a write method to result + parseIOSProjectFiles --> parseProjectFile + write method save both pbx and xcode + allow a more common experience
 *  CB-4981 updating help
 *  updating README.rd doc
 *  CB-5065 remove breaking parameter
 *  increased version to 0.14.0 to reflect that it is newer than published version on npm
 *  Correctly tell plugman which object in config to remove
 *  [CB-5012]: No whitespace in empty plist string nodes.
 *  CB-4983 plugin name check
 *  [windows8][CB-4943] .appxmanifest should be treated like .xml, not like a plist-xml
 *  [CB-4809]: Check that dependencies' IDs match the <dependency> tags
 *  [CB-4877]: Add --silent flag and basic logging.
 *  Removed extra comma
 *  Refactor to use Q.js promises in place of callbacks everywhere.
 *  [CB-4837]: Version 0.12.0. Release notes updated.
 *  Rename CHANGELOG.md -> RELEASENOTES.md
 *  CB-4492 tracking which of cli or plugman is used to fetch from registry
 *  removed unncessary console.logs
 *  add full ff support to plugman
 *  add firefoxos
 *  removed unncessary console.logs
 *  add full ff support to plugman
 *  add firefoxos
 *  Fix tests broken by lazy module requiring.
 *  CB-4786 adding documentation
 *  [CB-4793] Lazily require modules in plugin.js
 *  CB-4786 adding owner and checking in some spec requirements
 *  CB-4770 dependent plugins can be fetched from registry
 *  Updated version to 0.11.1-dev
 *  [CB-4750] Updated version and changelog for 0.11.0
 *  Revert "[CB-4714] Add -f option to 'plugin rm' to forcefully remove a plugin."
 *  [CB-4036] - forgot to add .bat to windows version paths
 *  [CB-4430] Add tests for lib-file support on Android.
 *  [CB-4430] Add lib-file support to Android
 *  [CB-4714] Add -f option to 'plugin rm' to forcefully remove a plugin.
 *  [CB-4502] Ignore www/config.xml, projects in ^[xyz].* now work
 *  [CB-4622]: Allow git URLs with a hash specifying git ref and subdir
 *  Fix use for path.join etc. for web paths as opposed to platform paths.
 *  CB-4494 adding info command and storing engine data in registry
 *  CB-4492 updated download tracking
 *  Add download count pushing to the registry fetching.
 *  [CB-4036] - forgot to add test file
 *  [CB-4036] - added ability to list multiple platforms in plugin.xml
 *  [CB-4036] - fix for handling current state of platform branches with version listed as dev
 *  [CB-3646] - fixed custom engine src script not being properly set
 *  [CB-4036] - fixed custom engine loading and added test
 *  [CB-4036] Forgot updated default-engines file
 *  [CB-4036] - fixed up the default engines and added some tests
 *  [CB-4036] - added more tests and fixed up some logic
 *  [CB-4036] - fixed up how plugin install handles the dev flag for repos as well as cleaned up some errors
 *  [CB-4490 & CB-4036] - added check for cordova-plugman and made a util function
 *  [CB-4036] - fixed up some small errors
 *  [CB-4036] - another pass at the engine/platform check problem
 *  [CB-4036] - synching up with master and fixed failing tests
 *  [CB-4036] - fixed up some failing tests
 *  [CB-4036] - refactored the engine/version checks for easier testing
 *  [CB-4036] - added test file for checking engine and versions
 *  [CB-4036] - first pass for adding version script
 *  support windows8 config-file which uses an xml file with a .appxmanifest extension
 *  plugin rm now doesn't choke when a file is already deleted
 *  0.10.1. [CB-4455] Add a deprecation warning when used with <plugins-plist> elements for cordova-ios 2.2 and earlier projects.
 *  [CB-4543] Changed implementation of graftXML to create parent if its not present
 *  [CB-4513] Adding logic to remove lib-files at uninstall
 *  update help for publish
 *  adding cordova name
 *  removed plugin spec and updated link to point to cordova-docs.
 *  0.10.0. Resolves [CB-4373].
 *  [CB-4373] Added tests for framework ref counting.
 *  Logic fix for framework-install.
 *  [CB-4373] Uninstall should no longer concern itself with frameworks (handled in prepare). Added array of four frameworks required by default by cordova-ios.
 *  [CB-4373] First pass at ios frameworks being handled in prepare stage.
 *  fix windows8 tests
 *  made console.log a plugman.emit.log call
 *  plugins are added to www/plugins/ folder
 *  windows8 is just like wp7 + wp8
 *  cleanup WIP adding windows8
 *  Updated readme with a requirements section. Resolved [CB-4375]: error msgs get properly bubbled up if git is missing. Version bump to 0.9.11.
 *  [wp] created fixture for testing csproj remove functionality
 *  Reset csproj object on every test, seems to fix a failing test for me.
 *  fixing tests
 *  Starting point, breakout functions
 *  removing xmldom dependency and using elementtree
 *  fixing doc
 *  bumping version
 *  CB-4415 fixing possible bugs on windows
 *  fixing settings in registry
 *  bug on first action
 *  updating version
 *  adding help
 *  updating specs
 *  adding registry code in plugman and removing dependencies. Updated configuration handling
 *  license appeared twice in the spec
 *  Updated readme with a requirements section. Resolved [CB-4375]: error msgs get properly bubbled up if git is missing. Version bump to 0.9.11.
 *  [wp] created fixture for testing csproj remove functionality
 *  [CB-4372] Fixed "Plugman fails when fetching local plugins with space in path"
 *  Reset csproj object on every test, seems to fix a failing test for me.
 *  more generix
 *  keep generic stuff generic
 *  [CB-4341] Adding a fix to make subdirectories work within a local plugin dependency - Includes the integration of integration specs which test installation   of plugins with dependencies
 *  [wp] tweak for adding pages in csproj
 *  0.9.10. [CB-4292] fixes for plugman and fetching.
 *  Fixes dependency fetching to work with subdirectories. Also allows subdirectories within platform tags
 *  0.9.9
 *  Bumping elementtree version to support namespaced xml
 *  adding callbacks to most functions and updating README.md
 *  testing config.js
 *  updating dependencies
 *  fixing fetch
 *  0.9.8. cordova versions that have "rc" in it will be munged slightly to add a dash in between the version and the rc number, to play nice with semver.
 *  0.9.7
 *  bumping version of dependencies
 *  removing --plugin option
 *  updated cli interface
 *  added tests for adding/removing Conent refereces to csproj file
 *  [windowsphone] csproj update for Content references
 *  error handling
 *  typo in callback
 *  Wp now adds www content to .csproj file
 *  adding callback to search
 *  fixed wrong URL
 *  0.9.6. [CB-3182] Interpolate variables into <info> tags.
 *  0.9.5. [CB-3572] Enable having <info> tags outside of a <platform> tag.
 *  0.9.4. Added an always-logged "results" event that is emitted when plugins are installed + uninstalled.
 *  Added WP8 to the supported platforms, was wp7 only
 *  [CB-4141] removed cordova_plugins.json writing and related spec. Added mee-self to the contributors. cordova_plugns.js is pretty printed.
 *  0.9.3. uninstallPlugin should not complain if a certain plugin repo is gone already.
 *  minor refactor, added specs
 *  adding argument check
 *  adding search results
 *  fixing issue with fetch
 *  adding config
 *  updating plugin spec
 *  updating cli options and adding short hands
 *  adding fetch and fixing cli interface
 *  adding registry dependency and wiring up commands
 *  adding actions
 *  typo
 *  minor refactor, added specs
 *  adding argument check
 *  adding search results
 *  fixing issue with fetch
 *  adding config
 *  updating plugin spec
 *  updating cli options and adding short hands
 *  adding fetch and fixing cli interface
 *  adding registry dependency and wiring up commands
 *  adding actions
 *  fixing help
 *  forgot comma
 *  typo
 *  minor refactor, added specs
 *  updating cli options and adding short hands
 *  adding fetch and fixing cli interface
 *  adding registry dependency and wiring up commands
 *  adding actions
 *  minor refactor, added specs
 *  adding search results
 *  fixing issue with fetch
 *  adding config
 *  updating plugin spec
 *  updating cli options and adding short hands
 *  adding fetch and fixing cli interface
 *  adding registry dependency and wiring up commands
 *  adding actions
 *  0.9.2. uninstallPlatform should never invoke uninstallPlugin. uninstallPlugin needs to recurse for dependencies.
 *  Removed "last updated" line from plugin spec.
 *  0.9.1. [CB-3499] Uninstalled plugins have their js-module www assets properly removed now.
 *  0.9.0
 *  Added a spec for uninstalling dependencies.
 *  Further [CB-4077] work: remove plugin directory for dependent plugins during uninstallation.
 *  Work for [CB-4077]: uninstallation should look at platform json file for determining which plugins to iterate over. fetching multiple plugins from git should not collide in temp dir.
 *  [CB-4077] Fix tests for cordova-cli, properly uninstall plugin source
 *  [CB-4077] Separate the actions of removing a plugin from a platform and removing the plugin entirely
 *  Revert "[CB-4016] only write out cordova_plugins.js."
 *  [CB-4016] only write out cordova_plugins.js.
 *  removed a console log
 *  Added tests for windows phone
 *  [CB-3751] test running on windows, yay
 *  0.8.2. Fixing event emitters. Require weirdness?
 *  0.8.1. Updated plugin spec re: compiler flags for iOS.
 *  Slight tweak for wp8 support in action-stack.
 *  Most console.logs should be removed in favour of events now. Hooked it up properly to cli shim.
 *  part of the way there to refactor output into eventemitter.
 *  updated xcode dependency to 0.6.1 which supports compiler flags. added compiler flag support to ios plugin installation for <source-file> elements.
 *  [npm] Add Michael Brooks as contributor.
 *  [CB-4060] Remove git dependency from the npm package.
 *  Fix in action-stack for wp8
 *  npm version 0.8.0. Tests are generally fixed up.
 *  redid core method specs so they dont touch FS
 *  added ability to load .dll from a windows phone plugin
 *  0.7.15. Made help output more.. helpful. Factored out into own module.
 *  0.7.14. Fixed [CB-3943]: dont error out <engine> element checking if version script fails.
 *  0.7.13. 0.7.12 already existed on npm but the version in the repo was never incremented...
 *  0.7.12
 *  Make sure to write out both cordova_plugins.json and cordova_plugins.js
 *  testing out plugin loader approach by jesse
 *  Should install plugin after fetching from url
 *  0.7.11
 *  Support for adding UI elements to windows phone plugins
 *  Treat 'dev' as greater than any expected engine version
 *  Fix misleading error message for failed run of the version script.
 *  updated wp8.js parser file
 *  Fix incorrect links in example plugins section
 *  0.7.10
 *  don't fail on undetected cordova version
 *  Update fetch tests now that clonePluginGitRepo always has a callback.
 *  Add support for relative dependencies with a url of "."
 *  Add .fetch.json metadata file to plugin dirs after fetch
 *  0.7.9
 *  fix for failing test in plugin uninstallation.
 *  exposed the config_changes module to the top-level module. refactored config-changes into discrete add+remove methods for handling config additions/removals.
 *  updating plugman to 0.7.8 for npm goodness
 *  npm test for windows friendliness
 *  Fix util/plugins tests
 *  Refactor uninstall to use an options object instead of many parameters
 *  Refactor fetch to use an options object instead of many parameters
 *  Refactor install to have a single options parameter
 *  [CB-3500] fixing usage+readme on uninstall instructions.
 *  Testing various plugins
 *  [CB-3234] - first pass at implementing engine tag
 *  Fix handling of git revisions when fetching dependencies
 *  cd into the cloned git repo before running git checkout.
 *  removed debuggin statements. fix for proper handling of fetch callback to check for errors before triggering main plugin handling.
 *  Whole bunch of debugging output and not quite working
 *  0.7.7. Fix for [CB-3431] adding stuff to xcodeproj library search paths
 *  Add a .reviewboardrc file to make using post-review easier.
 *  added node module usage docs
 *  start of node module usage documentation
 *  [CB-3429] fix for bad referencing of framework + source files. bumped to 0.7.6.
 *  split out readme and spec into separate documents
 *  0.7.5. Support for Windows Phone 7
 *  windows vetting: parsing xml is hard.
 *  split hten join, not join then join
 *  unused target-dir should not blow the thing up.
 *  i wonder how many more commits i will need to make to fix this.
 *  small tweak :)
 *  updating glob since it sucked on windows.
 *  fix for using glob since its dumb
 *  fixed an issue in csproj and start of tests for it
 *  change of npm test script so it works on windows
 *  added a csproj file parses module, incorporated into action stack, and first pass at wp7 platform handler
 *  start of rework of windows phone support to adhere to new arch
 *  [CB-3419] Change plugin XML namespace to cordova.apache.org
 *  0.7.4. Fix for [CB-2718] source-file can now specify framework=true to add the file as a framework in an iOS project.
 *  0.7.3 now that you need node minimum 0.9
 *  Update node version requirement
 *  updated dep ref of xcode to npm version num
 *  0.7.2. [CB-2717] namespace ios files within the Plugins/ dir by plugin id.
 *  0.7.1. fixed an issue with ios source-file installs.
 *  update to usage instructions and readme
 *  updated bb10 pull with latest dependency changes.
 *  Add leading slash to js-modules within cordova_plugins.json
 *  [BlackBerry10] Adding support for new BlackBerry10 platform  - Also re-introduces <lib-file> tags  Reviewed by Bryan Higgins <bhiggins@blackberry.com>i
 *  adding indent to config files
 *  version 0.7.0 after landing dependencies
 *  added dependency module tests.
 *  added tests for action-stack
 *  tests fixed! woot.
 *  fixed blackberry specs
 *  axed old remove modules, fixed up android handler specs.
 *  tweaks for prepare specs
 *  updated/fixed install + uninstall specs. added specs to both for plugins with dependencies
 *  uninstallation with dependents should now work.
 *  differentiating between top-level and dependent plugins. uninstall should work for the single plugin case (still need to fire off dependent plugin danglin uninstalls).
 *  slight workaround to avoid duplication operations during ios installs
 *  Add git ref support to fetch. Not used anywhere yet.
 *  giant refactor for dependencies, part one: changing the way install works.
 *  Fix source and destination paths for installing plugins from local disk
 *  Add spec for <dependency> tag to README.md.
 *  added specs for fetch and clonePluginGitRepo w.r.t. subdirectory support
 *  Fix tests after adding dependencies.
 *  First pass at dependency support.
 *  Adding subdirectory support to fetch.
 *  Make plugin cache directories be named after the plugin ID
 *  Add www_dir argument to uninstall.
 *  Add --www option to install and uninstall. Fix specs, add new specs.
 *  adding more specs for assets install/uninstall
 *  fixing uninstall reversion
 *  removing <asset/> from android, ios and blackberry. Updating specs
 *  updating assets and spec
 *  adding TODOs
 *  removing unused actions
 *  removing --list
 *  deleting unused and useless things
 *  updated plugin spec to note that js-module and asset elements can be nested under platform elements.
 *  CB-3215 added ability to use zip archives from local/remote sources
 *  CB-3284 moving assets to install/uninstall
 *  updates to spec regarding config-file elements.
 *  0.6.2 version bump
 *  added more variable documentation to README. added support for platform-agnostic config changes using top-level <config-file> element. add support for wildcard xpath selectors in xml helpers. added tests for prune/graftXML helper methods. factored out common parent resolution from xml helper methods. factored out common post-install prepare steps from install module.
 *  fixed up config_munge so it drops in PACKAGE_NAME var interpolation properly. delegated responsibility of determining package name to platform-level handlers. fixed up/added specs related to these changes.
 *  Fixed ios spec test to match moving some specific ios steps into a common module
 *  Added ios uninstall tests and fixed up ios a bit to get tests passing
 *  Fixing up ios uninstall tests
 *  fixing some tests in uninstall following refactor
 *  a couple of test stubs re package name interpolation inside the config handler. removed config-file and plugins-plist handling from platform-level handlers. added custom config file / wildcard filepaths for config file handling (as it was before more or less)
 *  finished config-handler uninstall specs
 *   a couple of config uninstallation specs and a plugin interpolation for uninstallation fix for config-handler.
 *  updates to plugman readme following weekend updates.
 *  bump to 0.6.1
 *  wire up config handler into prepare. config dependencies hsould be good to go now
 *  a few more specs and a tweak to plugins-plist handling.
 *  pretty much there for a config handler module. a few uninstall tests missing, and need to wire up to install/uninstall/prepare properly (and add tests for interaction between those modules)
 *  CB-3284 moving asset installation to platforms
 *  CB-3297 fixing trailing / case for local plugins
 *  re-adding installation by name from remote source
 *  removing --remove
 *  updated version for npm push
 *  remove old tests. jasmine migration complete
 *  proper uninstall + specs.
 *  added plugin value check when detecting collisions for ios
 *  ios resource and framework tests.
 *  ios resource specs
 *  moar ios specs
 *  minor tweaks to common specs
 *  a few more ios spec stubs
 *  tons of ios specs.
 *  fixed a few typos
 *  merged changes to common tests and common.js
 *  clonePluginGitRepo provides the dir of cloned plugin as callback param. propagates back to install module during a install->fetch->install flow.
 *  Fix copy of .java files being put in the wrong place.
 *  Fix exception on install of ios plugin. plistEle is an array.
 *  More exposing of stack traces.
 *  Fix for config-file element parsing
 *  Always print full stack trace on uncaught exceptions.
 *  ios handler spec stubs. removed library-file handling from ios handler.
 *  blackberry handler specs.
 *  remove www platform.
 *  refactored xml-helpers tests
 *  refactored plugins tests and made a small fix to the plugins.js
 *  finished android handler specs. fixed a bug with asset removal (yay tests!). removed retrieving plugins during an uninstall.
 *  removing unused <library-file> element code. android handler install specs done.
 *  some android handler specs
 *  finished refactor of ios handler. install grabs plugins-plist and hands over to handlers now too.
 *  Fix reference error where exports was referred to but not updated.
 *  Fix parse error in package.json
 *  added contributors to package.json. start of rejiggering ios handler.
 *  blackberry handler test stubs.
 *  fixed issue in common.js. added test stubs for common platform handler, and a few more to android handler
 *  android handler spec stubs.
 *  install specs done. uninstall still need some work. removed unused requires.
 *  android handler should be good to go. added fetch spec to install
 *  Added in remote plugin tests
 *  transaction based install with android handler refactored
 *  added spec stubs for install/uninstall to do with transactions of (uninstall) modifications
 *  (un)install specs. start of refactor
 *  prepare specs
 *  moar tests
 *  fetch tests in jasmine
 *  refactor should be done.
 *  hugeass refactor
 *  start of nodeunit -> jasmine
 *  Fully refactored tests.
 *  First pass at the refactoring, manual and automatic tests passing.
 *  Fixed ios install and uninstall test
 *  Fixed old test, axed submodules, SCREW submodules.
 *  Fix path reference to test file.
 *  Clarified spec
 *  Call prepare after each install and uninstall.
 *  README improvements for spec and dropping TODOs. Added <dependency> section to the spec and made explicit error cases.
 *  Fixed ios plist install with moving js file
 *  Fixed android two uninstall not removing directory
 *  Fixed up test for js file in ios config install
 *  Fixed android one uninstall test
 *  Remove --www parameter from --prepare, infer from platform instead.
 *  Add tests for --prepare behavior
 *  Remove all assets and JS modules on plugin uninstallation.
 *  Add --link option to --fetch; make --remove handle symlinks
 *  Added plugin loader to plugman test
 *  fixed up ios plist install
 *  removed www test
 *  fixed config changes
 *  fixed DummyPlugin's plugin.xml file for installing blackberry
 *  fixed blacberry install tests
 *  took out console log
 *  fixed android two install tests
 *  added in variable support back in
 *  fixed up some more ios tests
 *  Messed up ios merge - added some stuff back in and cleaned the ios tests up a bit
 *  fixed some typos with ending brances and misplaced semi colon
 *  trying to get ios tests work
 *  fixed tests to the point all android-one-install will work
 *  Deleted sql plugin and got some more tests passing
 *  Made sure to check for directory
 *  Fixed moving src folder around
 *  Remove src/<platform> directory structure.
 *  updated futures README with some minor tweaks to the spec and kept track of outstanding issues in JIRA
 *  Updated README with <js-module> tags, other updates, TODO
 *  No <platform> tags for JS-only plugins.
 *  Rewire commands: Split into --fetch, --install, --uninstall, --remove.
 *  Plugin loading works correctly when using plugman solo.
 *  --prepare with ported JS installation, cache plugins locally
 *  Add FUTURE.md describing the goals of this branch
 *  Remove src/<platform> directory structure.
 *  updated futures README with some minor tweaks to the spec and kept track of outstanding issues in JIRA
 *  Updated README with <js-module> tags, other updates, TODO
 *  No <platform> tags for JS-only plugins.
 *  Rewire commands: Split into --fetch, --install, --uninstall, --remove.
 *  Plugin loading works correctly when using plugman solo.
 *  --prepare with ported JS installation, cache plugins locally
 *  Add FUTURE.md describing the goals of this branch
 *  fixed issues with tests
 *  split wp8 into it's own file for future branching, today it is roughly identical to the wp7.js file but that could change
 *  added support for wp8, same as wp7 really, except plugin/xml must specify the platform.
 *  xml-helper now supports windows (BOM), writes to config.xml
 *  [wp7] Empty node handling, always modify csproj so Visual Studio will notice and reload it. Plugins folder use does not require project changes
 *  added support for --remove
 *  adding wp7
 *  [ios] remove external hosts fix
 *  [ios] add custom config-file support
 *  added error code for plugin installed, added check of plugin value to see if installed
 *  bumping version
 *  updating plugman test
 *  updating plugin with <info> tag
 *  CB-2782 adding support for <info>
 *  updating README.rd
 *  adding force actions for blackberry and android
 *  renamed blackberry assets
 *  updating options
 *  updating force-install for ios-plist
 *  updating force-install for ios-config-xml
 *  does not create a directory for files
 *  adding faulty plugin
 *  reverting changes on action failures and other minor modifications
 *  checking error in shell commands
 *  adding old iOS project with support for {PhoneGap,Cordova}.plist
 *  changing iOS project root tag from cordova to widget
 *  updating plugins manifest files to support config.xml
 *  updating iOS tests to use either plist or config.xml approach
 *  deleting old ios project
 *  adding force action, handling configuration errors and correcting indentation
 *  explicit error messages for configuration updates
 *  Updating docs for variables/preferences
 *  Tests for variable substitution
 *  Variable substitution on standard config files
 *  Add variable command line options
 *  Fix error message that used an out-of-scope variable
 *  Support web-only plugins with no config changes
 *  Issue issue 35 problem with license header and shebang
 *  Adding apache license headers and copyright
 *  bumping version to 0.5.7
 *  [tests] corrected test plugin.xml path
 *  [ios] add <access /> support
 *  [android] add <access /> support
 *  [ios] added support for weakly linked frameworks
 *  [tests] fix for tests
 *  Issue issue 31 --list error message
 *  small refactor and added tests
 *  Fixed up some tests and added bb10 to the dummyplugin for testing
 *  tests for uninstall on bb10
 *  Added another test to see if it edited config.xml
 *  Adding tests for BlackBerry 10 and fixed some errors up
 *  added cordova.echo test plugin
 *  renamed platform tag for BlackBerry 10
 *  Minor cleanup
 *  Fixing spacing
 *  Adding in bb10 support
 *  hiding git clone messages
 *  Adds support for old plugin.xml spec using <plugins-plist> for config.xml iOS projects.
 *  bumping shelljs to 0.1.x and de-asyncing one of the tests as a weird way of making it work...
 *  Issue issue 24 Unexpected end of input fix
 *  fixing legacy android 1.0 plugins.xml
 *  updating version to 0.5.6
 *  Issue issue 17 Adding collision detection for iOS/Android
 *  adding list plugins
 *  Issue issue 16 first test
 *  Fixes issue 14 - npm install -g, shortcut is still named 'pluginstall'
 *  removing backup file
 *  Issue issue 14 wrong bin name
 *  adding config.xml tests
 *  adding test config.xml plugin/project
 *  updating configuration support
 *  bumping versions to 0.5.5
 *  updating package.json to relfect name change
 *  never ever check in node modules. baaad.
 *  updating one reference
 *  renaming project
 *  Issue issue 10 tests for webless plugins
 *  Bumping version number
 *  Issue issue 7 adding tests
 *  issue issue 6 fixing android asset copying
 *  issue issue 6 asset copying always creates a new dir
 *  updating version
 *  deleting package directory when deleting a android plugin
 *  updating package.json version
 *  fixing issue with new project format
 *  adding +x on pluginstall.js
 *  fixing some of the install/uninstall tests
 *  add/remove res files from/to the right folder
 *  adding resource files to Resources/ instead of Plugins/
 *  adding test projects
 *  add/remove res files from/to the right folder
 *  adding resource files to Resources/ instead of Plugins/
 *  cleaned up gitignore. node_modules is checked in since this is an app. See: http://www.mikealrogers.com/posts/nodemodules-in-git.html
 *  removed unused module in package.json
 *  resources are added to the resources dir in xcode now
 *  reorganized multiple children tests, though some still break
 *  fixed android tests
 *  refactored android code. Fixed several tests
 *  re-enabled www support and fixed the tests
 *  merged my code in for ios, and cleaned up the ios tests.
 *  updating README.rd
 *  updating cli.js
 *  adding test for ios uninstall process
 *  updating ios uninstall process
 *  updating package.json to use a different version of xcode
 *  adding uninstall tests for cordova android 2.0 projects
 *  fixing android config file update
 *  removing node-uuid dependency
 *  support for git repo URLs
 *  adding android one uninstall test
 *  updating android uninstall process
 *  first try
 *  support for git repo URLs
 *  removing node-uuid dependency
 *  support for git repo URLs
 *  0.5.0
 *  [gitignore] web-platform test dir
 *  [www] Added new platform 'www'
 *  0.4.0
 *  [android] support $PACKAGE_NAME interpolation
 *  ignoring the right file
 *  [android] add multiple children from plugin.xml
 *  [util] function to compare two XML nodes
 *  remove unnecessary test file
 *  [test] [android] flex out commented test
 *  [android] single fs.writeFile per config file
 *  [npm] new node-xcode + version bump
 *  polyfill fs.existsSync for 0.6.x
 *  0.3.7
 *  [android] handle config.xml and plugins.xml
 *  [util] config-changes
 *  updating/refactoring tests
 *  [npm] update xcode to 0.4.0
 *  0.3.6
 *  support old-style and new-style source-file paths
 *  0.3.5
 *  [ocd] formatting stuff
 *  [android] Fixed android manifest test
 *  [android] Fixed a couple of errors
 *  [android] Updated android install script
 *  [unit-tests] Fixed ios AndroidManifest test
 *  [unit-tests] Updating unit tests
 *  updated .gitignore
 *  [ios] Added support for whitelist additions via access xml element
 *  [ios] Added support for preserve-dirs attribute on sourcefiles and headerfiles
 *  sourcefiles and headerfiles now support the target-dir attribute
 *  [readme] dev
 *  [test] tear down to clean existing files
 *  support node 0.8
 *  0.3.3: new node-xcode (support for .framework)
 *  update node-xcode, bump version
 *  npm test script
 *  [README] point to cordova-plugin-spec
 *  [npm] 0.3.1
 *  [ios] handle weirdness with node-plist
 *  [ios] support for frameworks (.dylib)
 *  v0.2.4
 *  [ios] glob {PhoneGap,Cordova}
 *  [cli] usage message + version check
 *  v0.2.3
 *  [npm] ncp @ 0.2.6
 *  use standard elementtree
 *  0.2.2
 *  [npm] replacing fstream with ncp
 *  fixing case-sensitive require
 *  v0.2.1
 *  [ios] fix for plists in build dir
 *  v0.2.0
 *  README + LICENSE
 *  [ios] fixing plist writing
 *  [bin] added hashbang to cli.js
 *  [ios] modify pbxproj file
 *  [ios] adding key to PhoneGap.plist
 *  [npm] using a different fork of node-plist
 *  [ios] move resource files
 *  [refactor] moving fstream usage into one function
 *  [test] fixing async problem
 *  v0.1.1
 *  [npm] using patched node-elementtree
 *  [npm] xcode@0.2.1 + patched plist
 *  [repo] moving node_modules to .gitignore
 *  [ios] moving some files around
 *  ignoring test-copied files
 *  [npm] glob@3.0.1
 *  [ios] official entries
 *  [ios] fixtures for testing iOS install
 *  [test] adding platform=ios
 *  [npm] node-plist
 *  [npm] node-xcode @ 0.2.0
 *  [xml] change source-code to source-file
 *  [cli] super basic cli
 *  remove stupid "only" attribute
 *  [android] make changes to AndroidManifest
 *  [test] fixture rename
 *  [npm] patch for elementtree
 *  [test] more fixture stuff
 *  [android] editing plugins.xml
 *  [test] fixture enhancement
 *  [test] typo
 *  [test] fixtures for config files
 *  [android] move specified src file
 *  [test] refactor to use nCallbacks
 *  moving nCallbacks into own module
 *  [npm] mkdirp@0.2.2
 *  [test] further fixtures
 *  [android] first pass at android install
 *  gitignore
 *  [test] fixture files for testing
 *  internal api changes
 *  [test] change to plugin.xml structure
 *  [npm] fstream + rimraf
 *  style for test names
 *  parseXml functions and tests
 *  [npm] elementtree@0.1.1
 *  initialize function
 *  [npm] nodeunit@0.6.4
 *  initial package.json
 *  liftoff
