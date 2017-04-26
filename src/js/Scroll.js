/*
 * Scroll: 滚动轴
 * */
import $ from './jTool';
const Scroll = {
	/*
	 @绑定表格滚动轴功能
	 $.table: table [jTool object]
	 */
	bindScrollFunction: function(table){
		const _tableDIV = table.closest('.table-div');
		// 绑定resize事件: 对表头吸顶的列宽度进行修正
		window.addEventListener('resize', function(){
			const _setTopHead = $('.set-top', table); // 吸顶元素
			if(_setTopHead && _setTopHead.length === 1){
				_setTopHead.remove();
				table.closest('.table-div').trigger('scroll');
			}
		});
		//绑定滚动条事件
		_tableDIV.unbind('scroll');
		_tableDIV.bind('scroll', function(e, _isWindowResize_){
			const _scrollDOMTop = $(this).scrollTop();
			// 列表所在的DIV,该DIV的class标识为table-div
			// 列表所在的外围容器
			const _tableWarp = _tableDIV.closest('.table-wrap');
			// 列表head
			const _thead = $('thead[grid-manager-thead]', table);
			// 列表body
			const _tbody = $('tbody', table);
			// 吸顶元素
			let _setTopHead = $('.set-top', table);
			// 当前列表数据为空
			if($('tr', _tbody).length == 0){
				return true;
			}
			if(!document.querySelector('.abc')){
				let scrollingTable = document.createElement('table');
				scrollingTable.className = 'abc'
				scrollingTable.appendChild(_thead.clone(true).addClass('set-top').get(0));
				_tableWarp.append(scrollingTable)
			}
			// TODO 可以尝试着将原来的 table-div 当作 gm-body; 并增加一个新的div gm-thead 用于存放thead. 以达到将head body分开 用来解决吸顶问题
			return true;
		});
	}
};
export default Scroll;
