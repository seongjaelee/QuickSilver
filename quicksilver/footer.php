<?php
/**
 * @author  Seong Jae Lee <seongjae at gmail dot com>
 * @date    2011-02-06
 * @name    QuickSilver
 * @desc    MoniWiki Theme
 * @version	1.2
 * @license GPL
 */
?>
</div>
<div id="WikiSide">
<h2>Navigation</h2>
<ul>
	<li><a href="<?php echo $this->link_url('FrontPage');?>">Front Page</a></li>
	<li><a href="<?php echo $this->link_url('RecentChanges');?>">Recent Changes</a></li>
	<li><a href="<?php echo $this->link_url('?action=RandomPage');?>">Random Page</a></li>
	<li><a href="<?php echo $this->link_url('TitleIndex');?>">Title Index</a></li>
	<li><a href="<?php echo $this->link_url('FindPage');?>">Full Search</a></li>
</ul>
<h2>Page</h2>
<ul>
	<li><a href="<?php echo $this->link_url($this->page->name.'?action=edit');?>">Edit</a></li>
	<li><a href="<?php echo $this->link_url($this->page->name.'?action=diff');?>">Diff</a></li>
	<li><a href="<?php echo $this->link_url($this->page->name.'?action=info');?>">Info</a></li>
	<li><a href="<?php echo $this->link_url($this->page->name.'?action=print');?>">Print</a></li>
	<li><a href="<?php echo $this->link_url($this->page->name.'?action=rename');?>">Rename</a></li>
	<li><a href="<?php echo $this->link_url($this->page->name.'?action=DeletePage');?>">Delete</a></li>
</ul>
<h2>Recent Changes</h2>
<ul>
<?php
	$list = array();
	$count = 0;
	foreach ( $DBInfo->editlog_raw_lines(30,null) as $line )
	{
		$parts = explode("\t", $line, 6);
		$list[$DBInfo->keyToPagename($parts[0])] = 1;
	}
	foreach ( array_keys($list) as $pagename )
	{
		$count++;
		echo "<li><a href='".$this->link_url($pagename)."'>".get_title($pagename)."</a></li>\n";
		if ( $count > 6 ) break;
	}
?>
</ul>
<?php
if ($DBInfo->use_scrap && $DBInfo->user->id != 'Anonymous')
{
	echo "<h2>Favorites</h2>";
	echo "	<ul>";
	
	$list = explode("\t",$DBInfo->user->info['scrapped_pages']);
	sort($list);
	for ( $i = 0; $i < count( $list ); $i++ )
	{
		$item = $list[$i];
		if ( !$DBInfo->hasPage($item) ) continue;
		echo "<li><a href='".$this->link_url($item)."'>".get_title($item)."</a></li>\n";
	}
	echo "	</ul>";
}
?>
</div>
<div style="clear:both;"></div>
</div>
<div id='WikiFooter'>
	<div>
		Powered by <a href="http://moniwiki.kldp.net/wiki.php" target="_blank">MoniWiki</a> / 
		Designed by <a href="http://bluebrown.net" target="_blank">Fantics</a>
	</div>
</div>

