ParkMemberId LIKE searchString OR  
        ParkMemberCode LIKE searchString OR  
        FullName LIKE searchString OR   
        DateOfBirth LIKE searchString OR   
        Address LIKE searchString OR  
        PersonalIdentification LIKE searchString OR  
        Mobile LIKE searchString OR   
        LicensePlate LIKE searchString OR
        BankName LIKE searchString OR  
        BankBranch LIKE searchString OR  
        BankAccount LIKE searchString OR  
        Email LIKE searchString OR  
        PICreatedDate LIKE searchString OR  
        PICreatedPlace LIKE searchString OR  
        PositionName LIKE searchString OR  
        CompensatoryLeaveDaysUsed LIKE searchString OR  
        AnotherLeavesDayUsed LIKE searchString OR  
        AvatarLink LIKE searchString OR  
        DepartmentName LIKE searchString


CREATE DEFINER = 'root'@'localhost'
PROCEDURE project3.Proc_Create_Employee(IN p_EmployeeId char(36),
 IN p_EmployeeCode varchar(20),
 IN p_FullName varchar(100),
 IN p_Gender int, IN p_DateOfBirth date, IN p_Address varchar(255),
 IN p_BankName varchar(255),
 IN p_BankBranch varchar(255),
 IN p_BankAccount varchar(255),
 IN p_Email varchar(50),
 IN p_Mobile varchar(50),
 IN p_LandLinePhone varchar(50),
 IN p_PersonalIdentification varchar(25),
 IN p_PICreatedDate date, IN p_PICreatedPlace varchar(255),
 IN p_TitleId char(36),
 IN p_CreatedDate datetime,
 IN p_CreatedBy varchar(255),
 IN p_ModifiedDate datetime,
 IN p_ModifiedBy varchar(255),
 )
BEGIN
  DECLARE new_employee_id char(36);

  START TRANSACTION;

    INSERT INTO project3.employee (EmployeeId,
    EmployeeCode,
    FullName,
    Gender,
    DateOfBirth,
    Address,
    BankName,
    BankBranch,
    BankAccount,
    Email,
    Mobile,
    LandLinePhone,
    PersonalIdentification,
    PICreatedDate,
    PICreatedPlace,
    TitleId,
    CreatedDate,
    CreatedBy,
    ModifiedDate,
    ModifiedBy)
      VALUES (p_EmployeeId,
       p_EmployeeCode,
       p_FullName,
       p_Gender,
       p_DateOfBirth,
       p_Address,
       p_BankName,
       p_BankBranch,
       p_BankAccount,
       p_Email,
       p_Mobile,
       p_LandLinePhone,
       p_PersonalIdentification,
       p_PICreatedDate,
       p_PICreatedPlace,
       p_TitleId,
       p_CreatedDate,
       p_CreatedBy,
       p_ModifiedDate,
       p_ModifiedBy);

  COMMIT;
END

CREATE DEFINER = 'root'@'localhost'
PROCEDURE project3.Proc_Update_Employee(
 IN p_EmployeeId char(36),
 IN p_EmployeeCode varchar(20),
 IN p_FullName varchar(100),
 IN p_Gender int, 
 IN p_DateOfBirth date, 
 IN p_Address varchar(255),
 IN p_BankName varchar(255),
 IN p_BankBranch varchar(255),
 IN p_BankAccount varchar(255),
 IN p_Email varchar(50),
 IN p_Mobile varchar(50),
 IN p_PersonalIdentification varchar(25),
 IN p_PICreatedDate date, 
 IN p_PICreatedPlace varchar(255),
 IN p_TitleId char(36),
 IN p_AvatarLink varchar(255),
 IN p_CreatedDate datetime,
 IN p_CreatedBy varchar(255),
 IN p_ModifiedDate datetime,
 IN p_ModifiedBy varchar(255)
 )
BEGIN
  START TRANSACTION;
    UPDATE project3.employee SET 
    EmployeeId = p_EmployeeId,
    EmployeeCode = p_EmployeeCode,
    FullName = p_FullName,
    Gender = p_Gender,
    DateOfBirth = p_DateOfBirth,
    Address = p_Address,
    BankName = p_BankName,
    BankBranch = p_BankBranch,
    BankAccount = p_BankAccount,
    Email = p_Email,
    Mobile = p_Mobile,
    PersonalIdentification = p_PersonalIdentification,
    PICreatedDate = p_PICreatedDate,
    PICreatedPlace = p_PICreatedPlace,
    TitleId = p_TitleId,
    AvatarLink = p_AvatarLink,
    CreatedDate = p_CreatedDate,
    CreatedBy = p_CreatedBy,
    ModifiedDate = p_ModifiedDate,
    ModifiedBy = p_ModifiedBy 
    where EmployeeId = p_EmployeeId;
  COMMIT;
END

CREATE DEFINER = 'root'@'localhost'
PROCEDURE project3.Proc_Inseart_Department(IN p_DepartmentId CHAR(36),
    IN p_DepartmentName VARCHAR(255),
    IN p_CompanyId CHAR(36)
    IN p_CreatedDate DATETIME,
    IN p_CreatedBy VARCHAR(255),
    IN p_ModifiedDate DATETIME,
    IN p_ModifiedBy VARCHAR(255),
)
BEGIN
    INSERT INTO project3.department (DepartmentId,
     DepartmentName,
     CompanyId
     CreatedBy,
     CreatedDate,
     ModifiedBy,
     ModifiedDate,
     )
    VALUES (p_DepartmentId,
     p_DepartmentName,
     p_CompanyId
     p_CreatedBy,
     p_CreatedDate,
     p_ModifiedBy,
     p_ModifiedDate,
     );
END

CREATE DEFINER = 'root'@'localhost'
PROCEDURE project3.Proc_Update_Department(IN p_DepartmentId CHAR(36),
    IN p_DepartmentName VARCHAR(255),
    IN p_CompanyId CHAR(36),
    IN p_CreatedDate DATETIME,
    IN p_CreatedBy VARCHAR(255),
    IN p_ModifiedDate DATETIME,
    IN p_ModifiedBy VARCHAR(255)
)
BEGIN
     UPDATE project3.department SET
     DepartmentName = p_DepartmentName,
     CompanyId = p_CompanyId,
     CreatedBy = p_CreatedBy,
     CreatedDate = p_CreatedDate,
     ModifiedBy = p_ModifiedBy,
     ModifiedDate = p_ModifiedDate
     WHERE DepartmentId = p_DepartmentId;
END

 BEGIN
   DECLARE exit handler for sqlexception
   BEGIN
   ROLLBACK;
   END;
   DECLARE exit handler for sqlwarning
   BEGIN
   ROLLBACK;
   END;

   PROCEDURE Proc_Create_Title(
    IN p_TitleId CHAR(36),
    IN p_TitleName VARCHAR(255),
    IN p_DepartmentId CHAR(36),
    IN p_CreatedDate DATETIME,
    IN p_CreatedBy VARCHAR(255),
    IN p_ModifiedDate DATETIME,
    IN p_ModifiedBy VARCHAR(255)
)
BEGIN
    -- If TitleId doesn't exist, insert a new record, otherwise update the existing record
        INSERT INTO project3.title (
         TitleId,
         TitleName,
         CreatedBy,
         CreatedDate,
         ModifiedBy,
         ModifiedDate,
         DepartmentId)
        VALUES (p_TitleId,
         p_TitleName,
         p_CreatedBy,
         p_CreatedDate,
         p_ModifiedBy,
         p_ModifiedDate,
         p_DepartmentId);
END //
    ELSE
        UPDATE project3.title
        SET TitleName = p_TitleName,
            DepartmentId = p_DepartmentId,
            CreatedBy = p_CreatedBy,
            CreatedDate = p_CreatedDate,
            ModifiedBy = p_ModifiedBy,
            ModifiedDate = p_ModifiedDate
        WHERE TitleId = p_TitleId;