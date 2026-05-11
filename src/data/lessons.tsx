import React from 'react';
import { BarChart3, Search, Layers, GraduationCap, Printer, Calculator } from 'lucide-react';
import { Lesson } from '../types';

export const LESSONS: Lesson[] = [
  {
    id: 'l1',
    title: 'Phân biệt 1D và 2D Barcode',
    description: 'Kiến thức cơ bản về các loại mã vạch phổ biến.',
    icon: <BarChart3 className="w-6 h-6" />,
    content: [
      'Mã 1D (Linear): Chỉ chứa dữ liệu theo chiều ngang (ví dụ: Code 128, EAN-13).',
      'Mã 2D (Matrix): Chứa dữ liệu cả ngang và dọc (ví dụ: QR Code, Data Matrix).',
      'Máy quét 2D có thể quét được cả mã 1D, nhưng máy quét 1D không quét được mã 2D.'
    ]
  },
  {
    id: 'l2',
    title: 'Cách chọn Máy Quét phù hợp',
    description: 'Tư vấn khách hàng dựa trên nhu cầu thực tế.',
    icon: <Search className="w-6 h-6" />,
    content: [
      '- Môi trường: Nếu kho bãi bụi bặm, chọn IP65 trở lên.',
      '- Khoảng cách: Nếu quét kệ cao, chọn máy quét tầm xa (Long Range).',
      '- Loại mã: Nếu quét mã trên màn hình điện thoại, bắt buộc dùng máy quét 2D chuyên dụng (2D Imager).'
    ]
  },
  {
    id: 'l3',
    title: 'Lựa chọn Mực In (Ribbon)',
    description: 'Tối ưu chi phí và độ bền cho khách hàng.',
    icon: <Layers className="w-6 h-6" />,
    content: [
      'Dùng Wax cho tem nhãn vận chuyển (rẻ, dễ trầy).',
      'Dùng Wax/Resin cho tem nhãn mỹ phẩm, dược phẩm (bền hơn).',
      'Dùng Resin cho tem nhãn điện tử, hóa chất (chống dung môi, nhiệt độ).'
    ]
  },
  {
    id: 'l4',
    title: 'Quy trình Lên đơn & Theo dõi Đơn hàng',
    description: 'Quy trình chuẩn từ báo giá đến khi giao hàng thành công.',
    icon: <GraduationCap className="w-6 h-6" />,
    content: [
      '1. Làm báo giá: Phải đầy đủ tên sản phẩm, thông số kỹ thuật chi tiết, số lượng, tên công ty, địa chỉ công ty, số điện thoại khách hàng...',
      '2. Nhận thông tin đơn hàng: Tiếp nhận PO (Purchase Order) có xác nhận/đóng dấu từ phía công ty khách hàng.',
      '3. Lên đơn hàng: Gửi file cho bộ phận Kế hoạch sản xuất (lưu ý xóa giá trước khi gửi), sau đó mới gửi email đơn hàng đầy đủ cho Kế toán.',
      '4. Thông báo giao hàng: Xác nhận và báo cho khách hàng chính xác ngày dự kiến giao hàng.',
      '5. Theo dõi đơn hàng: Giám sát tiến độ sản xuất và vận chuyển để đảm bảo đúng hẹn.'
    ]
  },
  {
    id: 'l5',
    title: 'Cách chọn Máy In phù hợp',
    description: 'Tư vấn cấu hình máy in dựa trên nhu cầu sử dụng.',
    icon: <Printer className="w-6 h-6" />,
    content: [
      'Số lượng nhãn: Nếu in số lượng lớn (>5000 nhãn/ngày), chọn máy in Công nghiệp; nếu in ít, chọn máy Để bàn.',
      'Kích thước mã vạch: Nếu in mã vạch nhỏ (ví dụ trên linh kiện điện tử), cần chọn máy có độ phân giải cao (300-600 DPI) để đảm bảo độ nét.',
      'Cổng kết nối: Xác định khách hàng cần USB, LAN (Ethernet), RS232 hay Bluetooth/Wifi để chọn model phù hợp.',
      'Độ bền nhãn: Nếu khách hàng cần bảo quản nhãn dài hạn hoặc trong môi trường khắc nghiệt, tư vấn dùng mực Resin hoặc Wax/Resin loại tốt.'
    ]
  },
  {
    id: 'l6',
    title: 'Tính toán Quy cách Tem nhãn',
    description: 'Công thức quy đổi giữa mét dài và số lượng tem.',
    icon: <Calculator className="w-6 h-6" />,
    content: [
      'Khổ ngang (Width): Chiều rộng của con tem (ví dụ: 100mm).',
      'Chiều cao (Height): Chiều dài của con tem theo chiều quấn cuộn (ví dụ: 50mm).',
      'GAP: Khoảng cách giữa 2 con tem liên tiếp (thông thường là 3mm).',
      'Công thức tính số tem: Số tem = Chiều dài cuộn (m) * 1000 / (Chiều cao tem + GAP).',
      'Ví dụ: Cuộn 50m, tem cao 50mm, GAP 3mm => 50 * 1000 / (50 + 3) ≈ 943 tem/cuộn.',
      'Lõi giấy thông dụng: Lõi 1 inch (25mm) cho máy để bàn, Lõi 3 inch (76mm) cho máy công nghiệp.'
    ]
  }
];
