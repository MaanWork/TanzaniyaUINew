export class Product {
	ref: any = null
	ts: number = 0
	data: NonMotorProducts = null

	constructor(data) {
		this.ref = data.ref
		this.ts = data.ts
		const product = { ...data.data }
		product.id = data.ref['@ref'].id
		this.data = new NonMotorProducts(product)
	}
}

export class NonMotorProducts {
    LocationList:any[]= [
        {
            "LocationId": null,
            "LocationName": null,
            "SectionList": [
                {
                    "SectionId": null,
                    "SectionName": null,
                    "IndustryType": null,
                    "RiskId": null,
                    "BondType": null,
                    "BondYear": null,
                    "BondSuminsured": 0,
                    "ElecEquipSuminsured": 0,
                    "ContentId": null,
                    "ContentDesc": null,
                    "Description": null,
                    "SerialNo": null
                }
            ]
        }
    ]
    constructor(data?) {
        if(data?.LocationList){
            this.LocationList = data.LocationList
        } 
    }

}