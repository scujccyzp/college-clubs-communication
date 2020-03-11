<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-calendar"></i> 表单
                </el-breadcrumb-item>
                <el-breadcrumb-item>{{this.$store.state.clubNews.clubName}}</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div>
                <h4>标题</h4>
                <el-input
                    type="title"
                    placeholder="请输入标题"
                    v-model="title"
                    maxlength="10"
                    show-word-limit
                ></el-input>
            </div>
            <div>
                <h4>内容</h4>
                <quill-editor ref="myTextEditor" v-model="content" :options="editorOption"></quill-editor>
                <el-button class="editor-btn" type="primary" @click="submit">提交</el-button>
            </div>
        </div>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
export default {
    name: 'editor',
    data: function() {
        return {
            title: '',
            content: '',
            time: '',
            editorOption: {
                placeholder: '请输入内容'
            }
        };
    },
    components: {
        quillEditor
    },
    methods: {
        onEditorChange({ editor, html, text }) {
            this.content = html;
        },
        submit() {
            this.getTime();
            let param = new URLSearchParams();
            param.append('clubId', this.$store.state.clubNews.clubId);
            param.append('time', this.time);
            param.append('title', this.title);
            param.append('content', this.content);
            this.axios.post('/api/news/edit', param).then(res => {
                console.log(res.data);
                this.$message.success('发布成功');
                this.title = '';
                this.content = '';
                this.time = '';
            });
        },
        getTime() {
            var d = new Date();
            var y = d.getFullYear();
            var m = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
            var t = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
            var h = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
            var mi = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
            this.time = y + '-' + m + '-' + t + ' ' + h + ':' + mi;
        }
    }
};
</script>
<style scoped>
.container {
    padding: 0 10px 10px 10px;
}
.editor-btn {
    margin-top: 10px;
}
h4 {
    padding: 10px 0;
}
</style>