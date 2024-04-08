CREATE TABLE project3.leavedaysrequest (
  LeaveDaysRequestId char(36) NOT NULL DEFAULT '',
  EmployeeId char(36) NOT NULL DEFAULT '' COMMENT 'Nhân viên tạo đơn nghỉ',
  FromDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Ngày bắt đầu nghỉ',
  ToDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Ngày cuối cùng nghỉ',
  SalaryRate int DEFAULT NULL COMMENT 'Tỉ lệ hưởng lương',
  Reason text NOT NULL COMMENT 'Lí do nghỉ',
  ApproveBy varchar(255) NOT NULL DEFAULT '' COMMENT 'Người phê duyệt đơn xin nghỉ',
  SubstituteBy varchar(255) DEFAULT NULL COMMENT 'Người thay thế phê duyệt đơn xin nghỉ',
  Type varchar(50) DEFAULT NULL COMMENT 'Loại ngày nghỉ',
  Note text DEFAULT NULL COMMENT 'Ghi chú',
  CreatedBy varchar(255) DEFAULT NULL,
  ModifiedDate datetime DEFAULT NULL,
  CreatedDate datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  ModifiedBy varchar(255) DEFAULT NULL,
  Status int DEFAULT NULL COMMENT 'Trạng thái',
  PRIMARY KEY (LeaveDaysRequestId)
)
ENGINE = INNODB,
AVG_ROW_LENGTH = 491,
CHARACTER SET utf8mb4,
COLLATE utf8mb4_0900_ai_ci,
COMMENT = 'Bảng lưu thông tin các đơn xin nghỉ của nhân viên';

ALTER TABLE project3.leavedaysrequest
ADD CONSTRAINT FK_Employee_EmployeeId FOREIGN KEY (EmployeeId)
REFERENCES project3.employee (EmployeeId);