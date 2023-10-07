
INSERT INTO [dbo].[tbl_appUser]
    (
        [fname],
        [lname],
        [emailID],
        [mobile],
        [userPass],
        [emailOtp],
        [reg_date],
        [city],
        [addState],
        [usrAddess],
        [isVerified]
    )
VALUES 
    (
        @fname,
        @lname,
        @emailID,
        @mobile,
        @userPass,
        @emailOtp,
        @reg_date,
        @city,
        @addState,
        @usrAddess,
        @isVerified
    )


SELECT *
  FROM [dbo].[tbl_appUser]
  WHERE [appUserID]=appUserID