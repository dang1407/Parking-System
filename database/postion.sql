CREATE TABLE project3.position (
  PositionId char(36) NOT NULL DEFAULT '',
  PositionName varchar(255) NOT NULL DEFAULT '',
  CreatedBy varchar(255) DEFAULT NULL,
  CreatedDate datetime DEFAULT NULL,
  ModifiedBy varchar(255) DEFAULT NULL,
  ModifiedDate datetime DEFAULT NULL,
  DepartmentId char(36) NOT NULL ,
  PRIMARY KEY (PositionId)
)
ENGINE = INNODB,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci;

ALTER TABLE project3.position
ADD CONSTRAINT FK_position_DepartmentId FOREIGN KEY (DepartmentId)
REFERENCES project3.department (DepartmentId);