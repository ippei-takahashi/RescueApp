   function get_hour(ago) {
		now = new Date();
        str = now.getHours()-ago;
		if (str < 0) {
		str = str + 24;	
		}
		str = str + ":00";
		document.write(str);
	}
	