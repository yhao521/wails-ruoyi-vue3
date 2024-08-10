package main

import (
	"embed"
	"mySparkler/backend/services"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed config/config.yaml.example
var ymlDefault string

// var ymlDefault []byte

//go:embed sql/sqlite_data.sql
var sqlfiles embed.FS

//go:embed view/template
var templates embed.FS

func main() {
	//使用 10086 作为ginServer的端口
	services.WailsRun(assets, ymlDefault, sqlfiles, templates)
}
