INSERT INTO [newIndiaOman_dbapp].[newindiaoman_db].[tbl_quoteCustMapping]
    (
        [custID],
        [quoteID],
        [quoteNo]
    )
VALUES 
    (
        @custID,
        @quoteID,
        @quoteNo
    )


SELECT * FROM [newIndiaOman_dbapp].[newindiaoman_db].[tbl_quoteCustMapping] WHERE mapid = SCOPE_IDENTITY();