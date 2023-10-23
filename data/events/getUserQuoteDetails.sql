SELECT * FROM [tbl_appUser]
JOIN [tbl_quoteCustMapping] 
ON [tbl_appUser].[appUserID] = [tbl_quoteCustMapping].[custID] 
JOIN [MTRQuoteSUB]
ON [MTRQuoteSUB].[ROWID] = [tbl_quoteCustMapping].[quoteID]
WHERE [tbl_appUser].[appUserID] = @appUserID 
