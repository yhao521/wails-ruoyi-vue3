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
# CGO_ENABLED=1 CC=x86_64-w64-mingw32-gcc CXX=x86_64-w64-mingw32-g++  GOOS=windows GOARCH=amd64 wails build -clean -platform windows/amd64 

wails build -platform windows/amd64 




