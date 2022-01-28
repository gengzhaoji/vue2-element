const getters = {
    size: (state) => state.user.size,
    user: (state) => state.user.user,
    remark: (state) => state.user.remark,
    token: (state) => state.user.token,
    roles: (state) => state.user.roles,
    avatar: (state) => state.user.avatar,
    permissions: (state) => state.user.permissions,
    /**
     * 生成菜单部分
     */
    menu: (state) => state.menu.menu,
    menuList: (state) => state.menu.menuList,
};
export default getters;
