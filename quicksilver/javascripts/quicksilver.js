var mainMenus = [];
var flag = false;
var currentDialog = null;
var reloadFlag = 0;
var modalLogIn = "\
<div class='dialog'>\
	<h1>로그인</h1>\
	<form target='DummyIFrame' method='post' id='DialogLogInForm' action='"+getWikiSiteLink("UserPreferences")+"'>\
		<input type='hidden' name='action' value='userform'>\
		<label>아이디</label><input type='text' name='login_id'>\
		<label>비밀번호</label><input type='password' name='password'>\
		<div class='footer'>\
			<input type='submit' value='로그인' onClick='reloadFlag=1;'>\
			<input type='button' value='취소' onClick='$.modal.close();'>\
		</div>\
	</form>\
</div>";

var modalLogOut = "\
<div class='dialog'>\
	<h1>로그아웃</h1>\
	<form target='DummyIFrame' method='post' action='"+getWikiSiteLink("UserPreferences")+"'>\
		<input type='hidden' name='action' value='login'>\
		<input type='hidden' name='status' value='logoff'>\
		<div class='footer'>\
			<input type='submit' value='로그아웃' onClick='reloadFlag=1;'>\
			<input type='button' value='취소' onClick='$.modal.close();'>\
		</div>\
	</form>\
</div>";

var modalFullSearch ="\
<div class='dialog'>\
	<h1>전체 본문 검색</h1>\
		<form method='get' action='"+getWikiSiteLink("FrontPage")+"'>\
		<input type='hidden' name='action' value='fullsearch'>\
		<input type='text' name='value'>\
		<input type='hidden' name='context' value='1'>\
		<div class='footer'>\
			<input type='submit' value='검색'>\
			<input type='button' value='닫기' onClick='$.modal.close();'>\
		</div>\
	</form>\
</div>";

var modalTitleSearch ="\
<div class='dialog'>\
	<h1>제목 검색</h1>\
	<form method='get'>\
		<input type='hidden' name='action' value='titlesearch'>\
		<input type='text' name='value'>\
		<div class='footer'>\
			<input type='submit' value='검색'>\
			<input type='button' value='닫기' onClick='$.modal.close();'>\
		</div>\
	</form>\
</div>";

var modalCreate ="\
<div class='dialog'>\
	<h1>문서 생성</h1>\
	<input type='text' name='name' id='ModalDocumentName'>\
	<div class='footer'>\
		<input type='submit' value='생성' onClick='document.location.href=getWikiSiteLink($(\"#ModalDocumentName\").attr(\"value\")+\"?action=edit\")'>\
		<input type='button' value='닫기' onClick='$.modal.close();'>\
	</div>\
</div>";

function addShortcuts()
{
	$("body").prepend("<iframe id='DummyIFrame' style='display:none;' onload='if(reloadFlag===1)window.location.reload();'></iframe>");
	
	shortcut.add( "D",			function() { self.location = getWikiActionLink('diff'); }, { 'disable_in_input':true } );
	shortcut.add( "E",			function() { self.location = getWikiActionLink('edit'); }, { 'disable_in_input':true } );
	shortcut.add( "W",			function() { self.location = getWikiActionLink('edit'); }, { 'disable_in_input':true } );
	shortcut.add( "I",			function() { self.location = getWikiActionLink('info'); }, { 'disable_in_input':true } );
	shortcut.add( "P",			function() { self.location = getWikiActionLink('print'); }, { 'disable_in_input':true } );
	shortcut.add( "R",			function() { self.location = getWikiActionLink('show'); }, { 'disable_in_input':true } );
	shortcut.add( "K",			function() { self.location = getWikiActionLink('keywords'); }, { 'disable_in_input':true } );
	shortcut.add( "B",			function() { self.location = getWikiActionLink('bookmark'); }, { 'disable_in_input':true } );
	
	shortcut.add( "U",			function() { self.location = getWikiSiteLink('UserPreferences'); }, { 'disable_in_input':true } );
	
	shortcut.add( "A",			function() { self.location = getWikiActionLink('randompage'); }, { 'disable_in_input':true } );
	shortcut.add( "L",			function() { self.location = getWikiActionLink('likePages'); }, { 'disable_in_input':true } );
	shortcut.add( "F",			function() { self.location = getWikiSiteLink('FrontPage'); }, { 'disable_in_input':true } );
	shortcut.add( "C",			function() { self.location = getWikiSiteLink('RecentChanges'); }, { 'disable_in_input':true } );
	//shortcut.add( "S",			function() { self.location = getWikiSiteLink('FindPage'); }, { 'disable_in_input':true } );
	shortcut.add( "Q",			function() { self.location = getWikiSiteLink('FindPage'); }, { 'disable_in_input':true } );
	shortcut.add( "T",			function() { self.location = getWikiSiteLink('TitleIndex'); }, { 'disable_in_input':true } );
	shortcut.add( "H",			function() { self.location = getWikiActionLink('home'); }, { 'disable_in_input':true } );
	
	shortcut.add( "Ctrl+S", function() { $(".save-button").click(); }, { 'disable_in_input':false } );
	
	shortcut.add( "N",			function() { $.modal(modalCreate, modalOptions); }, { 'disable_in_input':true });
	shortcut.add( "G",			function() { $.modal((isLoggedIn===1)?modalLogOut:modalLogIn, modalOptions); }, { 'disable_in_input':true });
	shortcut.add( "S",			function() { $.modal(modalFullSearch, modalOptions); }, { 'disable_in_input':true });
	shortcut.add( ",",			function() { $.modal(modalTitleSearch, modalOptions); }, { 'disable_in_input':true });
	shortcut.add( ".",			function() { $.modal(modalTitleSearch, modalOptions); }, { 'disable_in_input':true });
	
	shortcut.add( "Esc",		manageSearchBox, { 'disable_in_input':false, 'propagate':true } );
}

var modalOptions =
{ 
	opacity: 80,
	focus: true,
	onShow: function() { currentDialog = true; $('.simplemodal-container:first input[type="text"]:first').focus(); }, 
	onClose: function() { currentDialog = false; $.modal.close(); }
};

var searchBoxFocused = false;
function manageSearchBox()
{
		if ( currentDialog ) return;
		if ( searchBoxFocused ) document.getElementById("SearchBox").elements["value"].blur();
}

function initSlideMenu()
{
	// Initialize Shortcuts
	addShortcuts();
	
	// Initialize Tables
	$('table.wiki tr:odd').addClass('odd');
}

$(document).ready( initSlideMenu );
