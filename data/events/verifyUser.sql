UPDATE [dbo].[tbl_appUser]
SET [isVerified]=1
WHERE [emailID]=@emailID and [emailOtp]=@emailOtp

SELECT *
  FROM [dbo].[tbl_appUser]
  WHERE [emailID]=@emailID and [emailOtp]=@emailOtp