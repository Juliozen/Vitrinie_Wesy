function loadBigData(fn, index)
{
	var version = "0.02";
	var host = 'https://storage.suaview.com.br/' + version+"/";
	index = typeof index == 'undefined' ? 0 : index;

	var dependeces = new Array
	(
		{type: 'css', src: host+'css/swiper.css'},
		{type: 'css', src: 'https://fonts.googleapis.com/css?family=Droid+Sans:400,700'},
		{type: 'css', src: host+'css/vitrine.css'},

		{type: 'js', src: host+'js/jquery-3.3.1.min.js'},
		{type: 'js', src: host+'js/firebase/firebase.js'},
		{type: 'js', src: host+'js/firebase/firebase-firestore.js'},
		{type: 'js', src: host+'js/analytics/analytics.min.js'},
		{type: 'js', src: host+'js/swiper/swiper.min.js'},
		{type: 'js', src: host+'js/vitrine/main.js'}
	);

	var idx = dependeces.length -1;
	var elementTag = dependeces[index].type == 'js' ? 'script' : 'link';

	var head = document.getElementsByTagName('head')[0];
	var script = document.createElement(elementTag);

	if(dependeces[index].type == 'js')
	{
		script.type = 'text/javascript';
		script.src = dependeces[index].src;
	}
	else
	{
		script.rel = 'stylesheet';
		script.href = dependeces[index].src;
	}

	script.onload = function()
	{
		if(dependeces.length -1 < (index+1))
		{
			return fn();
		}

	  loadBigData(fn, index+1);
	};

	head.appendChild(script);
}