CREATE TABLE project3.employee (
  EmployeeId char(36) NOT NULL COMMENT 'Id nhân viên',
  EmployeeCode varchar(20) NOT NULL  COMMENT 'Mã nhân viên',
  FullName varchar(100) NOT NULL  COMMENT 'Họ và tên nhân viên',
  Gender int  COMMENT 'Mã giới tính (0 - Nữ, 1 - Nam, 2 - Khác)',
  DateOfBirth date  COMMENT 'Ngày sinh',
  CreatedDate datetime  COMMENT 'Ngày tạo',
  CreatedBy varchar(255)  COMMENT 'Tạo bởi ',
  ModifiedDate datetime  COMMENT 'Ngày sửa đổi',
  ModifiedBy varchar(255)  COMMENT 'Sửa đổi bởi',
  Address varchar(255) ,
  BankName varchar(255) ,
  BankBranch varchar(255) ,
  BankAccount varchar(255) ,
  Email varchar(50) ,
  Mobile varchar(50) ,
  LandLinePhone varchar(50) ,
  PersonalIdentification varchar(25) ,
  PICreatedDate date ,
  PICreatedPlace varchar(255) ,
  PositionId char(36) NOT NULL ,
  PaidLeaveDaysUsed int ,
  CompensatoryLeaveDaysUsed int ,
  AnotherLeavesDayUsed int ,
  AvatarLink varchar(255) DEFAULT 'https://t4.ftcdn.net/jpg/00/64/67/63/240_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg',
  AccountId char(36) DEFAULT NULL,
  PRIMARY KEY (EmployeeId)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 655,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci,
COMMENT = 'Thông tin nhân viên';

ALTER TABLE project3.employee
ADD UNIQUE INDEX UK_employee_AccountId (AccountId);

ALTER TABLE project3.employee
ADD UNIQUE INDEX UK_employee_EmployeeCode (EmployeeCode);

ALTER TABLE project3.employee
ADD CONSTRAINT FK_employee_DepartmentId FOREIGN KEY (DepartmentId)
REFERENCES project3.department (DepartmentId) ON DELETE CASCADE;