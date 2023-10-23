INSERT INTO [dbo].[QUOTEMTRDRV]
    (
        [QUOTE_Refno],
        [pol_no],
        [dname],
        [dage],
        [dsex],
        [drelation],
        [did],
        [USR_ID],
        [IsCancelled],
        [dDOB]
    )
VALUES 
    (
        @QUOTE_Refno,
        @pol_no,
        @dname,
        @dage,
        @dsex,
        @drelation,
        @did,
        @USR_ID,
        @IsCancelled,
        @dDOB
    )


SELECT * FROM [dbo].[QUOTEMTRDRV] WHERE QUOTEMTRDrvID = SCOPE_IDENTITY();