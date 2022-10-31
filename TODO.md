1. 調整 extensions.json -> Vue.ESLint
2. App.vue -> router 改成 v-for 寫法
3. views 內的組件 -> import 改成絕對路徑寫法 (@/.....)
4. style 都要加 scoped，避免影響到全局樣式
5. 專案中加入 .editorconfig，並安裝套件，設定檔範例如下
# Editor configuration, see https://editorconfig.org
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
insert_final_newline = true
trim_trailing_whitespace = true

[*.ts]
quote_type = single

[*.md]
max_line_length = off
trim_trailing_whitespace = false

