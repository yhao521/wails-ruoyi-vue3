package file

import (
	"fmt"
	"io/fs"
	"os"

	"github.com/vrischmann/userdir"
)

func ExistDir(path string) {
	// 判断路径是否存在
	_, err := os.ReadDir(path)
	if err != nil {
		// 不存在就创建
		err = os.MkdirAll(path, fs.ModePerm)
		if err != nil {
			fmt.Println(err)
		}
	}
}

// getAppPath 获取应用主目录
func GetAppPath() string {
	//获取系统我的文档目录
	dataDir := userdir.GetDataHome()

	// homeDir, dirErr := os.UserHomeDir()
	// if dirErr != nil {
	// 	panic(any("获取系统用户主目录失败"))
	// }
	//获取我的文档目录
	return PathExist(fmt.Sprintf("%s/Documents/mySparklerFiles", dataDir))
	//获取我的文档目录，并初始化 sqlite 数据库
	// return b.pathExist("/opt/GoDeskFiles")
}

// pathExist 判断文件目录是否存在，不存在创建
func PathExist(path string) string {
	_, err := os.Stat(path)
	if err != nil && os.IsNotExist(err) {
		_ = os.MkdirAll(path, os.ModePerm)
	}
	return path
}
