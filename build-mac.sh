# 测试有没有警告、问题 
# go mod vendor 
# go test -mod=vendor

# node 15+
# go 1.18+

# dir_path=$(cat  wails.json |grep -w  "frontend:dir" | awk  '{print $2}'|awk -F '"' '{print $2}')
current_dir=$(cd `dirname $0` && pwd)
dir_path=${current_dir}/frontend
echo "current_dir dir: "${current_dir}
echo "rebuild dir: "${dir_path}
# 构建
rm -rf ${dir_path}/package-lock.json
rm -rf ${dir_path}/node_modules
# rm -rf ${dir_path}/wailsjs
npm install --prefix ${dir_path}
npm run build  --prefix ${dir_path}
wails build
# wails build -clean -o my-tools-darwin.app
# wails build -clean  -platform darwin/universal
# wails build -clean  -platform darwin/universal  -o my-tools-darwin-universal.app
# wails build -clean  -platform windows/arm64 -o my-tools-win-arm64.exe -s -nsis
# wails build -clean  -platform windows/amd64 -o my-tools-win-amd64.exe -s -nsis
# wails build -clean  -platform windows -o my-tools-win-all.exe  -s -nsis

# wails build -clean  -platform windows/arm64 -s -tags native_webview2loader
# cp -rf ./build/bin/my-tools.app /Users/yanghao/Applications/
# wails build -clean -debug   upx
# wails build -clean -debug  -platform darwin/universal 

# export CGO_CPPFLAGS="-Wno-error -Wno-nullability-completeness -Wno-expansion-to-defined"
# wails build -clean -debug  -platform darwin/universal upx


# export CGO_CPPFLAGS="-Wno-error -Wno-nullability-completeness -Wno-expansion-to-defined"
# 运行
# wails dev  -debounce 500