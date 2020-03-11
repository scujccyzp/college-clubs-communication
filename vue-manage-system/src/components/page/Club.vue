<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 基础表格
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
                <el-button
                    type="primary"
                    icon="el-icon-delete"
                    class="handle-del mr10"
                    @click="delAllSelection"
                >批量删除</el-button>

                <el-input v-model="query.name" placeholder="社团名" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
            </div>
            <el-table
                :data="clubs"
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="club_id" label="ID" width="55" align="center"></el-table-column>
                <el-table-column prop="club_name" label="社团名"></el-table-column>
                <el-table-column label="头像(查看大图)" align="center">
                    <template slot-scope="scope">
                        <el-image
                            class="table-td-thumb"
                            :src="$host + scope.row.club_avatar"
                            :preview-src-list="[$host + scope.row.club_avatar]"
                        ></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="club_qq" label="QQ群">
                    <template slot-scope="scope">
                        <p v-if="scope.row.club_qq == null">暂无</p>
                        <p v-else>{{scope.row.club_qq}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="社团简介" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <p v-if="scope.row.club_intro == null">暂无</p>
                        <p v-else>{{scope.row.club_intro}}</p>
                    </template>
                </el-table-column>
                <el-table-column label="是否热门" align="center">
                    <template slot-scope="scope">
                        <el-tag :type="'success'" v-if="scope.row.ishot === 1">是</el-tag>
                        <el-tag :type="'danger'" v-if="scope.row.ishot === 0">否</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label="操作" width="180" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="news(scope.row.club_id, scope.row.club_name)"
                        >发布新闻</el-button>
                        <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="pageTotal"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>
        </div>

        <!-- 编辑弹出框 -->
        <el-dialog title="编辑" :visible.sync="editVisible" width="30%">
            <el-form ref="form" :model="form" label-width="70px">
                <el-form-item label="用户名">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="地址">
                    <el-input v-model="form.address"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="saveEdit">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { fetchData } from '../../api/index';
export default {
    name: 'club',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 5
            },
            clubs: [],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            form: {},
            idx: -1,
            id: -1,
            clubNews: {
                clubId: 0,
                clubName: ''
            }
        };
    },
    created() {
        this.getData();
    },
    methods: {
        getData() {
            //获取总数量
            this.axios.get('/api/clubs/clubcount').then(res => {
                console.log(res.data);
                this.pageTotal = res.data.data[0].num;
            });

            //获取一页数据
            var i = (this.query.pageIndex - 1) * this.query.pageSize;
            this.axios.get(`/api/clubs/clubpage?pageSize=${this.query.pageSize}&pageNum=${i}`).then(res => {
                this.clubs = res.data.data;
                console.log(this.clubs);
            });
        },
        // 触发搜索按钮
        handleSearch() {},
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    this.$message.success('删除成功');
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },
        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            this.$message.success(`修改第 ${this.idx + 1} 行成功`);
        },
        // 分页导航
        handlePageChange(val) {
            this.$set(this.query, 'pageIndex', val);
            this.getData();
        },
        news(id, name) {
            this.$store.state.clubNews.clubId = id;
            this.$store.state.clubNews.clubName = name;
            console.log(this.$store.state.clubNews);
            this.$router.push({ path: `/editor` });
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}
</style>
