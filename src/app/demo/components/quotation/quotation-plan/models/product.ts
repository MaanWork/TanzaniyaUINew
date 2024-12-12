export class Product {
	ref: any = null
	ts: number = 0
	data: ProductData = null

	constructor(data) {
		this.ref = data.ref
		this.ts = data.ts
		const product = { ...data.data }
		product.id = data.ref['@ref'].id
		this.data = new ProductData(product)
	}
}

export class ProductData {
	
	id: string = '';
	CustomerName: string = '';
	Dob:any = '';
	OccupationType:any='';
	SalaryPerAnnum:any='';
	BenefitCoverMonth:any='';PaCoverId:any=null
	SumInsured:any='';ContentTypeId:any=null;
    SectionId: string='';ProfessionalStaff:any=null;
    IdProofType:string = '';HighestQualificationHeld:any=null;
    IdNo:string = '';IndustryName:any;UsageType:any='S';
    JobJoiningMonth:string = '';NatureOfBusinessId:any;NonProfessionalStaff:any=null;
    BetweenDiscontinued:string="N";MoneyInSafeBusinessSIYN:boolean=false;
	MoneyOutSafeBusinessSIYN:boolean=false;MoneyInPremisesSIYN:boolean=false;
	CashInTransitSIYN:boolean=false;CashInHandEmployeesSIYN:boolean=false;MoneyAnnualcarrySuminsuredSIYN:boolean=false;
	EthicalWorkInvolved:string='N';PowerPlantSIYN:boolean=false;CashInSafeSIYN:boolean=false;
	BuildingOwnerYn:any=null;InbuildConstructType:any=null;OutbuildConstructType:any=null;
	BuildingBuildYear:any='';BuildingFloors:any='';ElecMachinesSIYN:boolean=false;
	IndustryId:any='';CategoryId:any='';BreakDownCoverYN:any='No';MoneyCoverYN:any="No";
	FidelityCoverYN:any="No";WcYN:any="No";LiabilityYN:any="No";GoodsYN:any="No";
	ElecEquipSuminsured:any='0';MoneySinglecarrySuminsured:any='0';EquipmentSIYN:boolean=false;
	BuildingSuminsured:any='0';ContentSuminsured:any='0';TotalExcludedEmployees:any;
	GoodsTurnoverSuminsured:any='0';GoodsSinglecarrySuminsured:any='0';GeneralMachineSIYN:boolean=false;
	EmpliabilityExcessSuminsured:any='0';EmpliabilityAnnualSuminsured:any='0';MachineEquipSIYN:boolean=false
	FidelityAnnualSuminsured:any='0';FidelityAnyoccuSuminsured:any='0';BoilerPlantsSIYN:boolean=false;
	MoneyAnnualcarrySuminsured:any='0';MoneyInsafeSuminsured:any='0';ManuUnitsSIYN:boolean=false;
	CashInHandDirectors:any='0';CashInTransit:any='0';CashInHandEmployees:any='0';PlatinumSumInsured:any='0';
	CashInSafe:any='0';CashInPremises:any='0';RevenueFromStamps:any='0';MoneyInSafeBusiness:any='0';OfficeContentsSumInsured:any='0';
	MoneyOutSafeBusiness:any='0';MoneyInPremises:any='0';MoneyInLocker:any='0';AccidentalSumInsured:any='0';
	TpliabilityAnyoccuSuminsured:any='0';PersonalIntermediarySuminsured:any='0';IndemnityPeriod:any=null;
	BuildingUsageId: any='';Status:any='Y';TotalNoOfEmployees:any;TotalRejoinedEmployees:any;
	PersonalAccidentSuminsured: any=null;LiabilityOccupationId:any='';AccountOutstandingEmployees:any;
	AllriskSumInsured: any = '0';WallType:any='';RoofType:any='';TotalOutstandingAmount:any;
	AccountAuditentType:any;ElectronicEquipmentSI:any='0';AdditionalClaimsSumInsured:any='0';
	StockSumInsured:any=0;
	/*Product Burglary*/
	NatureOfTradeId:any='';InternalWallType:any='';PASumInsured:any=null;
	CeilingType: any = '';WindowsMaterialId:any='';GroupSumInsured:any=null;
	RegionCode: any = '';NightLeftDoor:any='';PAOccupationType:any=null;
	DistrictCode: any = '';InsuranceForId:any=[];GroupOccupationType:any=null;
	DoorsMaterialId: any = '';StockInTradeSi:any='';
	GoodsSi:any='';FurnitureSi:any='';ApplianceSi:any='';
	CashValueablesSi:any='';OccupiedYear:any='';
	WatchmanGuardHours:any='';AccessibleWindows:any='';ShowWindow:any='';
	FrontDoors:any='';BackDoors:any='';TrapDoors:any='';
	Address:any='';CategoryDesc:any='';InsuranceClass:any='';
	BuildingOccupied: any = '';Category:any=null;
	FirstLossPercentId:any='';IndemityPeriod:any='';MakutiYn:any='';PlasteGlassType:any='';PowerPlantSi:any='0';
	BoilerPlantsSi:any='0';ElecMachinesSi:any='0';ManuUnitsSi: any='0';MachineEquipSi: any='0';GeneralMachineSi: any='0';
	EquipmentSi: any='0';IssuingAuthority:any=null;
	category_1:any[]=[];employeeList:any[]=[];
	fidelityList: any[]=[];StockLossPercent:any='';
	GoodsLossPercent:any='';FurnitureLossPercent:any='';
	ApplianceLossPercent:any='';CashValueablesLossPercent:any='';
	MiningPlantSi:any='0';NonminingPlantSi:any='0';GensetsSi:any='0';
	ElectronicEquipSuminsured:any ='0';AooSumInsured:any=null;
	PlanType: any = null;AggSumInsured:any=null;
	DateOfJoiningYear:any=null;EmployeeName:any=null;
	LocationNameBuilding:any =null;
	LocationAddress:any =null; BuildingSumInsureds:any;
	PALocationName:any= null; PALocationAddress:any; PAName:any;
	PASalary:any ='0'; PANationalityID:any;PADob:any;
	ContentSI:any ='0';
	ContentDesc: any
	ContentSerialNo: any;InflationSumInsured:any='350000';
	ContentType: any; ContentLocation:any;
	AccDob:any = ''; AccNationID:any; AccSI:any ='';AccName:any; AccOccupation:any;
	AccidentLocation:any ='';EmpLiabilitySi:any=null;
	IndDob:any = null; IndNationID:any=null; IndSI:any =null;IndName:any = null; IndOccupation:any =null;
	IndLocation:any =null; DeviceLocation:any=null;DeviceType: any=null; DeviceMake:any=null;
	DeviceYear:any=null;DeviceSNo:any=null; RiskSI:any=null;RiskDescription:any=null;RiskSerialNo:any;
	RiskContentType:any;RiskLocation:any; MLocation:any=null;MDescription:any=null;MName:any=null;
	MContentType:any=null;MBrand:any=null;MSerialNo:any=null;MSI:any;
	EmpsName:any=null; EmpsOccupation:any =null;EmpsAddress:any=null;EmpsNationality:any=null;
	EmpsDob:any=null;EmpsJoin:any=null;EmpsPeriod:any=null;EmpsLocation:any=null;EmpsSI:any=null;
	fdName:any=null; fdOccupation:any =null;fdAddress:any=null;fdNationality:any=null;
	fdDob:any=null;fdJoin:any=null;fdPeriod:any=null;fdLocation:any=null;fdSI:any=null;
	AccessoriesSI:any=null;
AccessoriesSerialNo:any=null;
AccessoriesType:any=null;
AccessoriesChassisNo:any=null;
FireBuildingSi:any='0';FirePlantSi:any='0';
FidEmpSi:any='0';
FireEquipSi:any='0';FireStockSi:any='0';
ElqSI:any='0';ElqLocation:any;ElqList:any;ElqJoin:any;ElqPeriod:any;Elqmake:any;
MoneySafeLimit:any='0';
MoneyOutofSafe:any='0';
MoneyDirectorResidence:any='0';
MoneyCollector:any='0';
MoneyAnnualEstimate:any='0';
MoneyMajorLoss:any='0';onAssetSumInsured:any='0';onStockSumInsured:any='0';
BurglarySi:any='0';StrongroomSi:any='0';InsurancePeriodSi:any='0';AnyAccidentSi:any='0';
otheroption:any='';otherFioption:any='';FidEmpCount:any='0';IndustryBussinessAllRisk:any;
	/*ShortTerm Product*/
	OwnerName:any=null;
	OwnerCategory: any=null;RegistrationNo:any=null;
	ChassisNo: any=null;ManufactureYear:any=null;
	FuelType: any=null;Color:any=null;
	Make: any=null;
	Model: any=null;
	BodyType: any=null;
	MotorUsage: any=null;
	EngineNo: any
	EngineCapacity: any
	SeatingCapacity: any;OccupationId:any=null;
  	ModelDesc: any=null;RenewalYn:any='N';
  OtherModelDesc: any=null;WaterTankSi:any='0';ArchitectsSi:any='0';LossOfRentSi:any='0';TypeOfProperty:any='';
  JewellerySi:any='0';GroupMemberSi:any='0';
  PaitingsSi:any ='0';TotalNoOfGroupMemeber:any=0;
  CarpetsSi:any='0';GroupOccupationId:any=null;
  EquipmentSis:any='0';MotorCategory:any='';Section:any=null;
  LegalLiabilityAnnualAggreagte:any='0';ProductTurnover:any='0';
  GrossProfitSi: any='0';IndemnityPeriodSi:any='0';MoneyStrongroom:any='0';
  TransportedBy: any='';ModeOfTransport:any='';MoneyinPremises:any='0';
  GeographicalCoverage: any='';otherGroupoption:any=null;MoneyInSafe:any='0';
  EstAnnualCarriesSiLc: any='0';SingleRoadSiLc:any='0';MoneyinTransit:any='0';
  otheroptionPer: any = '';patientList:any[]=[];FireSumInsured:any='0';
  TTDSumInsured: any=null;InsuranceType:any=null;PreviousInsuranceYN:any='N';
  MESumInsured: any=null;EmployeeCounts:any;PreviousLossRatio:any=null;
  FESumInsured: any=null;ProfessionalOccupation:any;ProfessionalType:any;GISI:any;
  ProfessionalSI:any;IndemnityTypes:any;maxDate: "2022-09-25";DomesticServantSi:any='0';
  MiddleName:any='';LastName:any='';MobileCode:any=null;MobileNo:any=null;VehicleSI:any=null
	PassengerFirstName: any='';BusinessName:any=null;BusinessSI:any='0';
	PassengerLastName: any='';CoveringDetails:any=null;DescriptionOfRisk:any=null;
	GenderId: any='';OccupationDesc=null;CoveringDetailsBI:any=null;DescriptionOfRiskBI:any=null;
	RelationId: any='';Estimatedannualcashcarryings:any='0';
	Nationality: any=''
	PassportNo: any=''
	HorsePower: any=''
	InsurancetypeDesc: any
	InsuranceClassDesc: any
	BankingDelegation: any
	LoanStartDate: any
	LoanEndDate: any
	CollateralCompanyAddress: any
	CollateralCompanyName:any
	LoanAmount:any='';ExpiryDate:any=null;
	UsageId: any='';ClaimExperience:any=null;
	vehicleTypeIvr: any=''
	ZoneCirculation: any=''
	DateOfCirculation: any=''
	NewValue: any=''
	MarketValue: any=''
    AggregatedValue: any=''
	Zone:any=null
	Class:any=null;FirstLossPayeeYN:any='N';InflationConstructionType:any='';
	BuildingConstructionType:any='';
	BuildingSumInsured:any='0';
	ContentConstructionType:any='';
	ContentSumInsured:any='0';
	GeyserSumInsured:any='0';
	HailDamageSumInsured:any='0';
	FirstLossBasis:any='';
	FirstLossBasisSumInsured:any='0';
	MiscellaneousConstructionType:any='';
	MiscellaneousSumInsured:any='0';
	PlantConstructionType:any='';
	PlantSumInsured:any='0';
	PowerSurgeSumInsured:any='0';
	RentSumInsured:any='0';
	TradeConstructionType:any='';
	TradeSumInsured:any='0';
	WaterLeakageSumInsured: any
	ThirdAspectSumInsured: any
	LiabilityLossSumInsured: any
  ClaimsPreparationSumInsured: any
  LiabilitySumInsured: any
	constructor(data?) {
		this.id = data?.id ?? ''
		this.CustomerName = data?.CustomerName ?? '';
		this.VehicleSI = data?.VehicleSI ?? '';
		this.MobileCode = data?.MobileCode ?? '';
		this.MobileNo = data?.MobileNo ?? '';
		this.Dob = data?.Dob ?? '';
		this.ContentTypeId = data?.ContentTypeId ?? '';
		this.OccupationType = data?.OccupationType ?? '';
		this.SalaryPerAnnum = data?.SalaryPerAnnum ?? '';
		this.BenefitCoverMonth = data?.BenefitCoverMonth ?? '';
		this.SumInsured = data?.SumInsured ?? '';
		this.Section = data?.Section ?? '';
		this.SectionId = data?.SectionId ?? '';
		this.IndustryName = data?.IndustryName ?? '';
		this.NatureOfBusinessId = data?.NatureOfBusinessId ?? '';
		this.TotalNoOfEmployees = data?.TotalNoOfEmployees ?? '';
		this.FidEmpCount = data?.TotalNoOfEmployees ?? '';
		this.TotalExcludedEmployees = data?.TotalExcludedEmployees ?? '';
		this.TotalRejoinedEmployees = data?.TotalRejoinedEmployees ?? '';
		this.TotalOutstandingAmount = data?.TotalOutstandingAmount ?? '';
		this.AccountOutstandingEmployees = data?.AccountOutstandingEmployees ?? '';
		this.AccountAuditentType = data?.AccountAuditentType ?? '';
		this.IdProofType = data?.IdProofType ?? '';
		this.IdNo = data?.IdNo ?? '';
		this.FirstLossPayeeYN = data?.FirstLossPayeeYN ?? 'N';
		this.CategoryDesc = data?.CategoryDesc ?? '';
		this.JobJoiningMonth = data?.JobJoiningMonth ?? '';
		this.BetweenDiscontinued = data?.BetweenDiscontinued ?? '';
		this.EthicalWorkInvolved = data?.EthicalWorkInvolved ?? '';
		this.IndustryId = data?.IndustryId ?? '';
		this.CategoryId = data?.CategoryId ?? '';
		this.Category = data?.Category ?? '';
		this.HighestQualificationHeld = data?.HighestQualificationHeld ?? null;
		this.IssuingAuthority = data?.IssuingAuthority ?? null;
		this.DateOfJoiningYear = data?.DateOfJoiningYear ?? null;
		this.EmployeeName = data?.EmployeeName ?? null;
		this.BuildingOwnerYn = data?.BuildingOwnerYn ?? null;
		this.InbuildConstructType = data?.InbuildConstructType ?? null;
		this.OutbuildConstructType = data?.OutbuildConstructType ?? null;
		this.BuildingBuildYear = data?.BuildingBuildYear ?? '';
		this.BuildingFloors = data?.BuildingFloors ?? '';
		this.WallType = data?.WallType ?? '';
		this.RoofType = data?.RoofType ?? '';
		this.BuildingUsageId = data?.BuildingUsageId ?? '';
		this.PersonalIntermediarySuminsured = data?.PersonalIntermediarySuminsured ?? '';
		this.PersonalAccidentSuminsured = data?.PersonalAccidentSuminsured ?? '';
		this.FireSumInsured = data?.FireSumInsured ?? '0';
		this.BusinessName = data?.BusinessName ?? null;
		this.BusinessSI = data?.BusinessSI ?? '0';
		this.CoveringDetails = data?.CoveringDetails ?? null;
		this.DescriptionOfRisk = data?.DescriptionOfRisk ?? null;
		this.CoveringDetailsBI = data?.CoveringDetailsBI ?? null;
		this.DescriptionOfRiskBI = data?.DescriptionOfRiskBI ?? null;
		this.OccupationDesc = data?.OccupationDesc ?? null;
		this.AllriskSumInsured = data?.AllriskSumInsured ?? '';
		this.ElecEquipSuminsured = data?.ElecEquipSuminsured ?? '';
		this.DomesticServantSi = data?.DomesticServantSi ?? '';
		this.ElectronicEquipmentSI = data?.ElectronicEquipmentSI ?? '';
		this.MoneySinglecarrySuminsured = data?.MoneySinglecarrySuminsured ?? '';
		this.ContentSuminsured = data?.ContentSuminsured ?? '';
		this.BuildingSuminsured = data?.BuildingSuminsured ?? '';
		this.GoodsTurnoverSuminsured =  data?.GoodsTurnoverSuminsured ?? '';
		this.GoodsSinglecarrySuminsured = data?.GoodsSinglecarrySuminsured ?? '';
		this.EmpliabilityAnnualSuminsured = data?.EmpliabilityAnnualSuminsured ?? '';
		this.FidelityAnnualSuminsured = data?.FidelityAnnualSuminsured ?? '';
		this.MoneyAnnualcarrySuminsured = data?.MoneyAnnualcarrySuminsured ?? '';
		this.MoneyInsafeSuminsured = data?.MoneyInsafeSuminsured ?? '';
		this.TpliabilityAnyoccuSuminsured = data?.TpliabilityAnyoccuSuminsured ?? '';
		this.ElectronicEquipSuminsured = data?.ElectronicEquipSuminsured ?? '';
		this.BreakDownCoverYN = data?.BreakDownCoverYN ?? 'No';
		this.FidelityCoverYN = data?.FidelityCoverYN ?? 'No';
		this.Status = data?.Status ?? 'Y';
		this.PreviousLossRatio = data?.PreviousLossRatio ?? '';
		this.PreviousInsuranceYN = data?.PreviousInsuranceYN ?? 'N'
		this.WcYN = data?.WcYN ?? 'No';
		this.LiabilityYN = data?.LiabilityYN ?? 'No';
		this.GoodsYN = data?.GoodsYN ?? 'No';
		this.NatureOfTradeId = data?.NatureOfTradeId ?? '';
		this.InternalWallType = data?.InternalWallType ?? '';
		this.CeilingType = data?.CeilingType ?? '';
		this.RegionCode = data?.RegionCode ?? '';
		this.DistrictCode = data?.DistrictCode ?? '';
		this.WindowsMaterialId = data?.WindowsMaterialId ?? '';
		this.DoorsMaterialId = data?.DoorsMaterialId ?? '';
		this.NightLeftDoor = data?.NightLeftDoor ?? '';
		this.BuildingOccupied = data?.BuildingOccupied ?? '';
		this.InsuranceForId = data?.InsuranceForId ?? []
		this.StockInTradeSi = data?.StockInTradeSi ?? '';
		this.GoodsSi = data?.GoodsSi ?? '';
		this.FurnitureSi = data?.FurnitureSi ?? '';
		this.ApplianceSi = data?.ApplianceSi ?? '';
		this.CashValueablesSi = data?.CashValueablesSi ?? '';
		this.OccupiedYear = data?.OccupiedYear ?? '';
		this.WatchmanGuardHours = data?.WatchmanGuardHours ?? '';
		this.AccessibleWindows = data?.AccessibleWindows ?? '';
		this.ShowWindow = data?.ShowWindow ?? '';
		this.FrontDoors = data?.FrontDoors ?? '';
		this.BackDoors = data?.BackDoors ?? '';
		this.TrapDoors = data?.TrapDoors ?? '';
		this.Address = data?.Address ?? '';
		this.AdditionalClaimsSumInsured = data?.AdditionalClaimsSumInsured ?? '0';
		this.WaterLeakageSumInsured = data?.WaterLeakageSumInsured ?? '0';
		this.ThirdAspectSumInsured = data?.ThirdAspectSumInsured ?? '0';
		this.LiabilityLossSumInsured = data?.LiabilityLossSumInsured ?? '0';
		this.OfficeContentsSumInsured = data?.OfficeContentsSumInsured ?? '0';
		this.ClaimsPreparationSumInsured = data?.ClaimsPreparationSumInsured ?? '0';
		this.LiabilitySumInsured = data?.LiabilitySumInsured ?? '0';
		this.EmpLiabilitySi = data?.EmpLiabilitySi ?? '0';
		this.FidEmpSi = data?.EmpLiabilitySi ?? '0';
		this.CashInHandDirectors = data?.CashInHandDirectors ?? '0';
		this.CashInTransit = data?.CashInTransit ?? '0';
		this.CashInHandEmployees = data?.CashInHandEmployees ?? '0';
		this.CashInSafe = data?.CashInSafe ?? '0';
		this.CashInPremises = data?.CashInPremises ?? '0';
		this.RevenueFromStamps = data?.RevenueFromStamps ?? '0';
		this.MoneyInSafeBusiness = data?.MoneyInSafeBusiness ?? '0';
		this.MoneyOutSafeBusiness = data?.MoneyOutSafeBusiness ?? '0';
		this.MoneyInLocker = data?.MoneyInLocker ?? '0';
		this.FirstLossPercentId = data?.FirstLossPercentId ?? '';
		this.IndemityPeriod = data?.IndemityPeriod ?? '';
		this.MakutiYn = data?.MakutiYn ?? '';
		this.PlasteGlassType = data?.PlasteGlassType ?? '';
		this.BoilerPlantsSi = data?.BoilerPlantsSi ?? '0';
		this.ElecMachinesSi = data?.ElecMachinesSi ?? '0';
		this.EquipmentSi = data?.EquipmentSi ?? '0';
		this.GeneralMachineSi = data?.GeneralMachineSi ?? '0';
		this.MachineEquipSi = data?.MachineEquipSi ?? '0';
		this.ManuUnitsSi = data?.ManuUnitsSi ?? '0';
		this.PowerPlantSi = data?.PowerPlantSi ?? '0';
		this.employeeList = data?.EmployeeList ?? [];
		this.fidelityList = data?.FidelityList ?? [];
		this.patientList = data?.PatientList ?? [];
		this.StockLossPercent = data?.StockLossPercent ?? '';
		this.GoodsLossPercent = data?.GoodsLossPercent ?? '';
		this.FurnitureLossPercent = data?.FurnitureLossPercent ?? '';
		this.ApplianceLossPercent = data?.ApplianceLossPercent ?? '';
		this.CashValueablesLossPercent = data?.CashValueablesLossPercent ?? '';
		this.MiningPlantSi  = data?.MiningPlantSi ?? '0';
		this.NonminingPlantSi = data?.NonminingPlantSi ?? '0';
		this.GensetsSi = data?.GensetsSi ?? '0';
		this.ElectronicEquipSuminsured = data?.ElecEquipSuminsured ?? '0';
		this.FireBuildingSi=data?.FireBuildingSi ?? '0';
	     this.FirePlantSi=data?.FirePlantSi ?? '0';
         this.FireEquipSi=data?.FireEquipSi ?? '0';
		 this.FireStockSi=data?.FireStockSi ?? '0';
		this.UsageType = data?.UsageType ?? 'S';
		this.PlanType = data?.PlanType ?? 'S';
		this.AooSumInsured = data?.AooSumInsured ?? null;
		this.AggSumInsured = data?.AggSumInsured ?? null;
		this.LocationNameBuilding = data ?.LocationName ?? '';
		this.LocationAddress = data ?.LocationAddress ?? '';
		this.BuildingSumInsureds = data?.BuildingSuminsured ?? '0';
		this.IndustryBussinessAllRisk = data?.IndustryId ?? '';
		// this.PALocationAddress = data?.accidentOccupation ?? '';
		this.PALocationName = data?.LocationName ?? '';
		this.ContentSI = data?.SumInsured ?? '';
		this.ContentDesc= data?.ContentRiskDesc ?? '';
		this.ContentSerialNo = data?.SerialNo ?? '';
		this.ContentType = data?.ItemDesc ?? '';
		this.AccOccupation = data?.OccupationDesc ??'';
		this.AccName = data?.PersonName ?? '';
		this.AccDob = data?.Dob ?? '';
		this.AccNationID = data?.NationalityId ?? '';
		this.AccSI = data?.Salary ?? '';
		this.IndLocation = data?.RiskId ?? null;
		this.IndOccupation = data?.OccupationDesc ?? null;
		this.IndName = data?.PersonName ?? null;
		this.IndDob = data?.Dob ?? null;
		this.IndNationID = data?.NationalityId ?? null;
		this.IndSI = data?.Salary ?? null;
		this.EmpsLocation = data?.RiskId ?? null;
		this.EmpsDob = data?.DateOfBirth  ?? null;
		this.MoneySafeLimit = data?.MoneySafeLimit ?? '0';
         this.MoneyOutofSafe = data?.MoneyOutofSafe ?? '0';
        this.MoneyDirectorResidence = data?.MoneyDirectorResidence ?? '0';
          this.MoneyCollector = data?.MoneyCollector ?? '0';
        this.MoneyAnnualEstimate = data?.MoneyAnnualEstimate ?? '0';
      	this.MoneyMajorLoss = data?.MoneyMajorLoss ?? '0';
		this.OwnerName = data?.OwnerName ?? '';
		this.OwnerCategory = data?.OwnerCategory ?? '';
		this.ChassisNo = data?.ChassisNo ?? '';
		this.RegistrationNo = data?.RegistrationNo ?? '';
		this.ManufactureYear = data?.ManufactureYear ?? '';
		this.FuelType = data?.FuelType ?? '';
		this.Color = data?.Color ?? '';
		this.Make = data?.Make ?? '';
		this.Model = data?.Model ?? '';
		this.BodyType = data?.BodyType ?? '';
		this.MotorUsage = data?.MotorUsage ?? '';
		this.EngineNo = data?.EngineNo ?? '';
		this.EngineCapacity = data?.EngineCapacity ?? '';
		this.SeatingCapacity = data?.SeatingCapacity ?? '';
		this.ModelDesc = data?.ModelDesc ?? '';
		this.OtherModelDesc = data?.OtherModelDesc ?? '';
		this.LiabilityOccupationId = data?.LiabilityOccupationId ?? '';
		this.OccupationId = data?.OccupationId ?? '';
		this.ProductTurnover = data?.ProductTurnover ?? '0';
		this.LegalLiabilityAnnualAggreagte = data?.LegalLiabilityAnnualAggreagte ?? '0';
		this.GrossProfitSi = data?.GrossProfitSi ?? '0';
		this.IndemnityPeriodSi = data?.IndemnityPeriodSi ?? '0';
		this.TransportedBy = data?.TransportedBy ?? '';
		this.ModeOfTransport = data?.ModeOfTransport ?? '';
		this.GeographicalCoverage = data?.GeographicalCoverage ?? '';
		this.SingleRoadSiLc = data?.SingleRoadSiLc ?? '0';
		this.EstAnnualCarriesSiLc = data?.EstAnnualCarriesSiLc ?? '0';
		this.onAssetSumInsured = data?.onAssetSumInsured?? '0';
		this.onStockSumInsured = data?.OnstockSumInsured ?? '0';
		this.BurglarySi = data?.BurglarySi ?? '0';
		this.StrongroomSi = data?.StrongroomSi ?? '0';
		this.AnyAccidentSi = data?.AnyAccidentSi ?? '0';
		this.InsurancePeriodSi = data?.InsurancePeriodSi ?? '0';
		this.otheroption=data?.OtherOccupation ?? '';
		this.otherFioption = data?.OtherOccupation ?? '';
		this.otheroptionPer = data?.OtherOccupation ?? '';
		this.InsuranceType = data?.InsuranceType ?? null;
		this.InsuranceClass = data?.InsuranceClass ?? null;
		this.InsurancetypeDesc = data?.InsurancetypeDesc ?? null;
		this.InsuranceClassDesc = data?.InsuranceClassDesc ?? null;
		this.PassengerFirstName = data?.PassengerFirstName ?? '';
		this.PassengerLastName = data?.PassengerLastName ?? '';
		this.ExpiryDate = data?.ExpiryDate ?? '';
		this.GenderId = data?.GenderId ?? '';
		this.RelationId = data?.RelationId ?? '';
		this.Nationality = data?.Nationality ?? '';
		this.PassportNo = data?.PassportNo ?? '';
		this.HorsePower = data?.HorsePower ?? '';
		this.PaCoverId = data?.PaCoverId ?? '';
		this.BankingDelegation = data?.BankingDelegation ?? '';
		this.LoanStartDate = data?.LoanStartDate ?? '';
		this.LoanEndDate = data?.LoanEndDate ?? '';
		this.CollateralCompanyAddress = data?.CollateralCompanyAddress ?? '';
		this.CollateralCompanyName = data?.CollateralCompanyName ?? '';
		this.LoanAmount = data?.LoanAmount ?? '';
		this.UsageId = data?.UsageId ?? '';
		this.vehicleTypeIvr = data?.vehicleTypeIvr ?? '';
		this.ZoneCirculation = data?.ZoneCirculation ?? '';
		this.NewValue = data?.NewValue ?? '';
		this.MarketValue = data?.MarketValue ?? '';
		this.AggregatedValue = data?.AggregatedValue ?? '';
		this.Zone = data?.Zone ?? '';
		this.Class = data?.Class ?? '';
		// this.EquipmentSi = data?.EquipmentSi ?? '0';
		// this.ElectronicEquipSuminsured = data.ElectronicEquipSuminsured ?? '0';
	}
}
