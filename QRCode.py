import qrcode

url = input("Enter the URl : ").strip()
file_path = "qrcode.jpg"

qr = qrcode.QRCode()
qr.add_data(url)

img = qr.make_image()
img.save(file_path)
