CREATE TABLE project3.leavedaysrequestdetail (
  LeaveDaysRequestDetailId char(36) NOT NULL DEFAULT '',
  LeaveDaysRequestId char(36) NOT NULL DEFAULT '',
  RelateEmployeesId text DEFAULT NULL,
  LeaveEmployeesId text NOT NULL,
  CreatedDate datetime DEFAULT NULL,
  CreatedBy varchar(255) DEFAULT NULL,
  ModifiedDate datetime DEFAULT NULL,
  ModifiedBy varchar(255) DEFAULT NULL,
  PRIMARY KEY (LeaveDaysRequestDetailId, LeaveDaysRequestId)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 491,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci,
COMMENT = 'Bảng Detail của các đơn xin nghỉ của nhân viên';

ALTER TABLE project3.leavedaysrequestdetail
ADD CONSTRAINT FK_leavedaysrequestdetail_LeaveDaysRequestId FOREIGN KEY (LeaveDaysRequestId)
REFERENCES project3.leavedaysrequest (LeaveDaysRequestId);