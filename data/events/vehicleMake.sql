select distinct vt.CODE,
			CASE 
				when vt.table_code IS NULL  then isnull(vt.[description],'')
					else isnull(vm.TABLE_MAKE_e,'') 
				end 
				AS [DESCRIPTION]
			from VechicleTypeM  as vt
			left join tbl_RP_VehicleMake as vm on vm.table_code=vt.table_code
			where vt.code <> 'OTH'	
			and len(vt.description) >0		
			order by [DESCRIPTION]
