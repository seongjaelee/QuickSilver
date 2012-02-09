<?php
/**
 * @author  Seong Jae Lee <seongjae at gmail dot com>
 * @date    2011-02-06
 * @name    QuickSilver
 * @desc    MoniWiki Theme
 * @version	1.2
 * @license GPL
 */
include_once("plugin/login.php");
?>

<script type="text/javascript">
	// used in quicksilver.js
	var isLoggedIn = <?php if($DBInfo->user->id=='Anonymous') echo "0"; else echo "1";?>;
	var currPageName = '<?php echo $this->link_url($this->page->name);?>';
	var testPageName = '<?php echo $this->link_url('TestPageName');?>';
	function getWikiActionLink(actionName) { return currPageName + '?action=' + actionName; }
	function getWikiSiteLink(pageName) { return testPageName.replace('TestPageName', pageName); }
</script>
<script type="text/javascript" src="<?php echo $this->themeurl;?>/javascripts/jquery-1.4.2.min.js"></script>
<script type="text/javascript" src="<?php echo $this->themeurl;?>/javascripts/shortcut.js"></script>
<script type="text/javascript" src="<?php echo $this->themeurl;?>/javascripts/jquery.simplemodal-1.3.5.min.js"></script>
<script type="text/javascript" src="<?php echo $this->themeurl;?>/javascripts/quicksilver.js"></script>
<!--[if IE 6]> <style type="text/css"> #SearchBox input#SearchBoxSubmit { background: transparent url('<?php echo $this->themeurl;?>/imgs/search-icon.png') no-repeat; } </style> <![endif]-->
<!--[if lt IE 7]> <script defer type="text/javascript" src="<?php echo $this->themeurl;?>/javascripts/pngfix.js"></script> <![endif]-->
<!--[if lt IE 7]> <script type="text/javascript" src="http://www.doxdesk.com/file/software/js/minmax.js"></script> <![endif]-->

<div id="WikiHeader">
	<div class="Button" id="Sitename">
		<a href="<?php echo $this->link_url('FrontPage'); ?>">
			<span style="display:inline-block;margin-top:4px;"><?php echo $DBInfo->sitename; ?></span>
		</a>
	</div>
	<form id='SearchBox' method='get' action='.'>
		<div>
			<input type='text' name='value' onfocus='searchBoxFocused=true;' onblur='searchBoxFocused=false;'/>
			<input type='submit' name='status' id='SearchBoxSubmit' value=''/>
			<input type='hidden' name='action' value='fullsearch' />
			<input type='hidden' name='context' value='1' />
		</div>
	</form>
	<div class="Button" style="float:right;margin-right:1em;" id="Login">
	<div style="margin-top:4px;">
		<?php if($DBInfo->user->id==='Anonymous'){?>
		<a onclick='$.modal(modalLogIn);'>LogIn</a>
		<?php }else{ ?>
		<a onclick='$.modal(modalLogOut);'>LogOut</a>
		<?php } ?>
	</div>
	</div>
	<?php if($DBInfo->user->id==='Anonymous'){?>
	<div class="Button" style="float:right;" id="Register">
	<div style="margin-top:4px;">
		<a href='<?php echo $this->link_url('UserPreferences');?>'>Register</a>
	</div>
	</div>
	<?php } ?>
</div>

<div id="WikiMain">

<h1><?php echo $title?></h1>
<?php echo $msg?>
<div id="WikiBody">
