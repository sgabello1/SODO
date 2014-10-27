  // Connecting to ROS
  // -----------------
  var index = 0 ;
  var i = 0;
  var d = new Date();
  var time  = d.getTime();
  var timeM = time;
  var odZone;
  var height;
  var label;
  var ind;

  var ros = new ROSLIB.Ros({
	  //url : 'ws://192.168.1.88:9090'
    	url : 'ws://localhost:9091'
  });

 

//subscribing  opendata for visualization
  var listener_opendata = new ROSLIB.Topic({
    ros : ros,
    name : '/opendata',
    messageType : 'open_data_msg/Data'

  });
  
  listener_opendata.subscribe(function(opendata) {
	  
	//fillin array
	  
    odZone = new Array(); // array of vector eleArray
    ind = 0 ;
    
  	for(var j = 0; j < opendata.data.length - 1 ; j++){ // j polygons
  		  	  	
  	  	var z = 0 ;
  	    var eleArray = new Array(); // open data values  
  	    var h = new Array();
  	    
  		// if it is > x -> visualize!
  		
  		if(opendata.data[0].label == "edifici")
  			height = opendata.data[j].attributes[0].value ;
  		
  		if( opendata.data[0].label == "alberate"){
  	  
  	for (var i=0; i < opendata.data[j].area.points.length; i++) // i points message.data[0].area.points[0].x
  		{
  		

  			
  		if(opendata.data[j].area.points[i].x != 0 || opendata.data[j].area.points[i].y != 0)
  		{	
  		
  			eleArray[z] = new google.maps.LatLng(opendata.data[j].area.points[i].x, opendata.data[j].area.points[i].y);
  			 
  			z++;
  	  		
  		}
  		else
  		{
  		// put array in odZone 
  		  	odZone[ind] = eleArray;

  	  		//h[ind] =  opendata.data[j-1].attributes[0].value;
  	  		//console.log("h elem " + opendata.data[j].attributes[0].value);
  	  		
  	  		ind++;   		//index of odZone
  	  		
  	  	// re - init	
  	  	z = 0 ;
  	    eleArray = new Array(); // open data values  
  		}
  		
  		}
  	 
  		// put array in odZone 
	  	odZone[ind] = eleArray;
	  	
  		//h[ind] =  opendata.data[j-1].attributes[0].value;
  		//console.log("h elem " + opendata.data[j].attributes[0].value);

  		ind++;   		//index of odZone
  		
  	}
  	}
		//alert(opendata.data[j-1].attributes[0].value);
  	//visualizeOpendata (odZone,h,opendata.data[0].label);
  });

  

  
  
	  
  
