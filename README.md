# Hệ thống quản lý bãi đỗ xe

## Frontend: VueJS 3 Composition API + Tailwind + PrimeVue

- Frontend sử dụng thư viện PrimeVue và Tailwind giúp quá trình thiết kế giao diện trở nên dễ dàng và nhanh hơn khá nhiều nhờ số lượng component khá đồ sộ, giao diện có sẵn cũng rất đẹp, không cần phải chỉnh lửa lại nhiều.
- Cấu trúc thư mục Frontend:

  - src
    - assets: các tài nguyên hình ảnh, icon, ...
    - hooks: các hook tự viết
    - layout: các bố cục của trang web
    - router: định tuyến các component
    - stores: pinia store chia sẻ các state dùng chung
    - uikits: các component UI tự viết
    - views: Các view được nhóm theo các thành phần chức năng khác nhau

## Backend: C# Web API Clean Architecture

1. Domain:

- Chứa các entities (đối tượng) đại diện cho dữ liệu của ứng dụng.
- Các entities có các business rules (quy tắc nghiệp vụ) xác định cách thức hoạt động của dữ liệu.
- Domain là lớp core của ứng dụng, không phụ thuộc vào bất kỳ lớp nào khác.

2. Infrastructure:

- Chứa các adapters (bộ điều hợp) kết nối với các hệ thống bên ngoài như database, file system, messaging queues, v.v.
- Các adapters cung cấp các API để truy cập và thao tác dữ liệu từ các hệ thống bên ngoài.
- Infrastructure không phụ thuộc vào Application.

3. Application:

- Chứa các use cases (trường hợp sử dụng) thực hiện các chức năng của ứng dụng.
- Các use cases sử dụng các services (dịch vụ) để thực hiện các tác vụ nghiệp vụ.
- Application phụ thuộc vào Domain nhưng không phụ thuộc vào Infrastructure hoặc API.

4. API:

- Chứa các controllers (bộ điều khiển) tiếp nhận request từ client và trả về response.
- Controllers sử dụng các use cases từ Application để thực hiện các chức năng nghiệp vụ.
- API phụ thuộc vào Application nhưng không phụ thuộc vào Domain hoặc Infrastructure.
