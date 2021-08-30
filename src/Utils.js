export function GetInputImageData(file) {
	return new Promise((resolve, reject) => {
		if (file) {
			const fileReader = new FileReader();
			fileReader.readAsDataURL(file);
			fileReader.addEventListener('load', function () {
				resolve(this.result);
			});
			fileReader.addEventListener('error', function () {
				reject('Error getting file data');
			});
		} else reject('Invalid File Sent');
	});
}