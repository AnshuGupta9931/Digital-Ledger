export const otpTemplate = (otp) => {
	return `<!DOCTYPE html>
	<html>
	
	<head>
		<meta charset="UTF-8">
		<title>OTP Verification Email</title>
		<style>
			body {
				background-color: #ffffff;
				font-family: Arial, sans-serif;
				font-size: 16px;
				line-height: 1.4;
				color: #333333;
				margin: 0;
				padding: 0;
			}
	
			.container {
				max-width: 600px;
				margin: 0 auto;
				padding: 20px;
				text-align: center;
			}
	
			.logo {
				max-width: 200px;
				margin-bottom: 20px;
			}
	
			.message {
				font-size: 18px;
				font-weight: bold;
				margin-bottom: 20px;
			}
	
			.body {
				font-size: 16px;
				margin-bottom: 20px;
			}
	
			.cta {
				display: inline-block;
				padding: 10px 20px;
				background-color: #FFD60A;
				color: #000000;
				text-decoration: none;
				border-radius: 5px;
				font-size: 16px;
				font-weight: bold;
				margin-top: 20px;
			}
	
			.support {
				font-size: 14px;
				color: #999999;
				margin-top: 20px;
			}
	
			.highlight {
				font-weight: bold;
			}
		</style>
	
	</head>
	
	<body>
		<div class="container">
			<a href="https://digitledger.io"><img class="logo" src="https://i.ibb.co/MR2qk2D/digit-ledger-logo.png" alt="Digit Ledger Logo"></a>
			<div class="message">OTP Verification Email from Digit Ledger</div>
			<div class="body">
				<p>Hey there,</p>
				<p>Welcome to Digit Ledger! We're excited to have you on board. To get started with your account, please verify your identity with the OTP (One-Time Password) below:</p>
				<h2 class="highlight">${otp}</h2>
				<p>This OTP is valid for the next 5 minutes. If you didn’t request this, you can safely ignore this email.</p>
				<p>Once verified, you'll be able to manage your transactions, track your finances, and explore all features of Digit Ledger.</p>
			</div>
			<div class="support">Need help? Reach us anytime at <a href="mailto:support@digitledger.io">support@digitledger.io</a>.</div>
		</div>
	</body>
	
	</html>`;
};
