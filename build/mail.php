	<?php
	if(isset($_POST['phone'])){

	// функция отправки письма
	function send_mail($message){
	// почта, на которую придет письмо
        $mail_to = "ggserj@yandex.ru; // почта, на которую придет письмо
		// тема письма
		$subject = "Заявка лендинг HC Аэровитамины";

		// заголовок письма
		$headers= "MIME-Version: 1.0\r\n";
		$headers .= "Content-type: text/html; charset=utf-8\r\n"; // кодировка письма
		$headers .= "From: Новая заявка <no-reply@test.com>\r\n"; // от кого письмо

		// отправляем письмо
		mail($mail_to, $subject, $message, $headers);
	  }



// собираем данные из формы

  $name = trim(strip_tags($_POST['name']));
  $phone = trim(strip_tags($_POST['phone']));
  $email = trim(strip_tags($_POST['email']));
  $adress = trim(strip_tags($_POST['adress']));
  $comment = trim(strip_tags($_POST['comment']));
  $shipping = $_POST['shipping'];
  $total = $_POST['total'];

  $message  = "ФИО: " . $name . "<br>";
  $message .= "Телефон: " . $phone . "<br>";
  $message .= "Email: " . $email . "<br>";
  $message .= "Адрес: " . $adress . "<br>";
  $message .= "Комментарий: " . $comment . "<br>";
  $message .= "Способ доставки: " . $shipping . "<br>";
  $message .= $total . "<br>";



	send_mail($message); // отправим письмо

		echo '<p class="success">Заявка успешно отправлена!</p>';

	  exit;
	}

?>
