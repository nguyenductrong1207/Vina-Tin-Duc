/**
 * Seed script for VINA TIN DUC corporate website.
 * Populates Strapi with sample content for all pages.
 *
 * Usage:
 *   1. Start Strapi: pnpm cms:dev
 *   2. Run: node scripts/seed.mjs <admin-email> <admin-password>
 */

const STRAPI_URL = 'http://localhost:1337';
const email = process.argv[2];
const password = process.argv[3];

if (!email || !password) {
  console.error('Usage: node scripts/seed.mjs <email> <password>');
  process.exit(1);
}

let API_TOKEN = '';

// ============================================================
// AUTH
// ============================================================
async function authenticate() {
  console.log('🔑 Authenticating...');
  const res = await fetch(`${STRAPI_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok || !data.data?.token) {
    console.error('Login failed:', data);
    process.exit(1);
  }

  // Create API token
  const tokenRes = await fetch(`${STRAPI_URL}/admin/api-tokens`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${data.data.token}`,
    },
    body: JSON.stringify({
      name: `seed-${Date.now()}`,
      description: 'Temporary seed token',
      type: 'full-access',
      lifespan: 604800000,
    }),
  });
  const tokenData = await tokenRes.json();
  if (!tokenRes.ok || !tokenData.data?.accessKey) {
    console.error('Token creation failed:', tokenData);
    process.exit(1);
  }
  API_TOKEN = tokenData.data.accessKey;
  console.log('✓ Authenticated & token created\n');
}

// ============================================================
// HELPERS
// ============================================================
async function apiCall(method, path, body) {
  const res = await fetch(`${STRAPI_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${API_TOKEN}`,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const text = await res.text();
  let data;
  try { data = JSON.parse(text); } catch { data = { raw: text }; }
  if (!res.ok) {
    console.error(`  [${res.status}] ${method} ${path}:`, data?.error?.message || text.slice(0, 100));
    return null;
  }
  return data;
}

async function createEntry(path, body) {
  return apiCall('POST', path, { data: body });
}

async function upsertSingle(path, body) {
  return apiCall('PUT', path, { data: body });
}

async function publishEntry(path, documentId) {
  // Strapi 5 uses PUT with status field to publish
  return apiCall('PUT', `${path}/${documentId}`, { data: { publishedAt: new Date().toISOString() } });
}

// ============================================================
// GLOBAL SETTINGS
// ============================================================
async function seedGlobal() {
  console.log('→ Seeding Global Settings...');
  await upsertSingle('/api/global', {
    companyName: 'CÔNG TY TNHH VINA TÍN ĐỨC',
    companyNameEnglish: 'VINA TIN DUC COMPANY LIMITED',
    shortName: 'VINA TIN DUC CO., LTD',
    phone: '(028) 1234 5678',
    email: 'info@vinatinduc.com',
    address: 'Số 6, Đường DX 013, Khu phố 6, Phường Bình Dương, Thành phố Hồ Chí Minh, Việt Nam',
    website: 'https://vinatinduc.com',
    businessHours: 'Thứ 2 - Thứ 7: 8:00 - 17:00\nChủ nhật: Nghỉ',
    socialLinks: [
      { platform: 'facebook', url: 'https://facebook.com/vinatinduc' },
      { platform: 'zalo', url: 'https://zalo.me/vinatinduc' },
    ],
    defaultSeo: {
      metaTitle: 'VINA TIN DUC - Sản xuất nhựa & bao bì chất lượng cao',
      metaDescription: 'VINA TIN DUC COMPANY LIMITED - Chuyên sản xuất sản phẩm nhựa, bao bì, gia công khuôn mẫu, bán buôn và tái chế phế liệu tại Việt Nam.',
      keywords: 'nhựa, bao bì, plastic, packaging, khuôn mẫu, tái chế, VINA TIN DUC',
    },
  });
  console.log('  ✓ Global Settings');
}

// ============================================================
// HOMEPAGE
// ============================================================
async function seedHomepage() {
  console.log('→ Seeding Homepage...');
  const res = await upsertSingle('/api/homepage', {
    hero: {
      title: 'Giải pháp nhựa & bao bì toàn diện',
      subtitle: 'VINA TIN DUC cung cấp dịch vụ sản xuất nhựa, bao bì, gia công khuôn mẫu và tái chế với tiêu chuẩn chất lượng cao, đáp ứng mọi nhu cầu của doanh nghiệp.',
      cta: { label: 'Liên hệ tư vấn', url: '/contact', variant: 'primary', isExternal: false },
    },
    introduction: {
      heading: { title: 'Về VINA TIN DUC', subtitle: 'Đối tác tin cậy trong ngành nhựa và bao bì', centered: false },
      content: '<p>VINA TIN DUC COMPANY LIMITED là doanh nghiệp chuyên hoạt động trong lĩnh vực sản xuất sản phẩm từ nhựa (plastic), gia công khuôn mẫu, bán buôn và tái chế phế liệu.</p><p>Với đội ngũ chuyên nghiệp và trang thiết bị hiện đại, chúng tôi cam kết mang đến cho khách hàng những sản phẩm chất lượng cao, giá cả cạnh tranh và dịch vụ tận tâm.</p>',
    },
    capabilities: {
      heading: { title: 'Năng lực cốt lõi', subtitle: 'Dịch vụ đa dạng, đáp ứng mọi nhu cầu sản xuất và kinh doanh', centered: true },
      items: [
        { title: 'Sản xuất nhựa', description: 'Sản xuất sản phẩm từ nhựa PET, PP, PS, HDPE, LDPE, PE và nhựa phân hủy sinh học.' },
        { title: 'Bao bì & đóng gói', description: 'Giải pháp bao bì nhựa đa dạng: túi, hộp, chai, lọ, ống hút cho mọi ngành.' },
        { title: 'Gia công khuôn mẫu', description: 'Thiết kế và gia công khuôn mẫu chính xác cao, phục vụ sản xuất hàng loạt.' },
        { title: 'Bán buôn vật tư', description: 'Cung cấp nguyên liệu nhựa, máy móc, vật liệu xây dựng và kim loại.' },
        { title: 'Tái chế phế liệu', description: 'Thu mua và tái chế phế liệu nhựa, góp phần bảo vệ môi trường.' },
        { title: 'Thiết kế chuyên dụng', description: 'Tư vấn và thiết kế sản phẩm nhựa, bao bì theo yêu cầu riêng.' },
      ],
    },
    statistics: {
      heading: { title: 'Con số ấn tượng', subtitle: 'Minh chứng cho năng lực phục vụ', centered: true },
      items: [
        { value: '500', label: 'Vốn điều lệ (triệu VNĐ)', suffix: 'M' },
        { value: '50', label: 'Đối tác kinh doanh', suffix: '+' },
        { value: '100', label: 'Sản phẩm đa dạng', suffix: '+' },
        { value: '24', label: 'Hỗ trợ khách hàng', suffix: '/7' },
      ],
    },
    ctaSection: {
      title: 'Bạn cần giải pháp nhựa & bao bì?',
      description: 'Liên hệ với VINA TIN DUC ngay hôm nay để được tư vấn miễn phí và báo giá nhanh chóng.',
      cta: { label: 'Nhận báo giá', url: '/contact', variant: 'primary', isExternal: false },
    },
    seo: {
      metaTitle: 'VINA TIN DUC - Sản xuất nhựa, bao bì & gia công khuôn mẫu',
      metaDescription: 'Giải pháp toàn diện về sản xuất nhựa, bao bì, gia công khuôn mẫu, bán buôn và tái chế phế liệu tại Việt Nam.',
    },
  });
  if (res?.data?.documentId) await publishEntry('/api/homepage', res.data.documentId);
  console.log('  ✓ Homepage');
}

// ============================================================
// ABOUT
// ============================================================
async function seedAbout() {
  console.log('→ Seeding About...');
  const res = await upsertSingle('/api/about', {
    title: 'Giới thiệu về VINA TIN DUC',
    description: 'CÔNG TY TNHH VINA TÍN ĐỨC - Đơn vị chuyên sản xuất sản phẩm từ nhựa, gia công khuôn mẫu và kinh doanh vật tư công nghiệp.',
    content: '<h2>Về chúng tôi</h2><p>VINA TIN DUC COMPANY LIMITED là doanh nghiệp được thành lập và hoạt động tại Thành phố Hồ Chí Minh, Việt Nam. Công ty chuyên hoạt động trong lĩnh vực sản xuất sản phẩm từ plastic, gia công khuôn mẫu, bán buôn chuyên doanh và tái chế phế liệu.</p><h2>Lĩnh vực hoạt động</h2><ul><li>Sản xuất sản phẩm từ plastic (bao bì, chai, lọ, ống, hộp nhựa)</li><li>Gia công khuôn mẫu chính xác cao</li><li>Bán buôn máy móc, thiết bị và phụ tùng</li><li>Bán buôn kim loại và quặng kim loại</li><li>Bán buôn vật liệu xây dựng</li><li>Hoạt động thiết kế chuyên dụng</li><li>Tái chế phế liệu</li></ul><h2>Vật liệu chuyên dụng</h2><p>Chúng tôi làm việc với đa dạng nguyên liệu nhựa: PET, PETG, PLA, PP, PS, HDPE, LDPE, PE và nhựa phân hủy sinh học.</p><h2>Cam kết chất lượng</h2><p>VINA TIN DUC cam kết mang đến sản phẩm chất lượng cao, giá cạnh tranh, giao hàng đúng hẹn và hỗ trợ kỹ thuật tận tâm.</p>',
    mission: 'Cung cấp giải pháp nhựa và bao bì chất lượng cao, góp phần phát triển ngành công nghiệp Việt Nam với tinh thần trách nhiệm và bền vững.',
    vision: 'Trở thành đối tác hàng đầu trong lĩnh vực sản xuất nhựa, bao bì và gia công khuôn mẫu tại khu vực phía Nam.',
    values: '<ul><li><strong>Chất lượng</strong> - Sản phẩm đạt tiêu chuẩn kỹ thuật</li><li><strong>Tín nhiệm</strong> - Giữ chữ tín trong mọi giao dịch</li><li><strong>Đổi mới</strong> - Không ngừng cải tiến</li><li><strong>Bền vững</strong> - Phát triển gắn liền bảo vệ môi trường</li><li><strong>Đồng hành</strong> - Luôn đồng hành cùng khách hàng</li></ul>',
    milestones: [
      { year: '2024', title: 'Thành lập công ty', description: 'VINA TIN DUC được thành lập tại TP.HCM với vốn điều lệ 500 triệu VNĐ.' },
      { year: '2024', title: 'Đăng ký đa ngành', description: 'Hoàn tất đăng ký sản xuất nhựa, gia công khuôn, bán buôn và tái chế.' },
      { year: '2025', title: 'Mở rộng hoạt động', description: 'Phát triển mạng lưới đối tác và khách hàng trong khu vực phía Nam.' },
    ],
    seo: {
      metaTitle: 'Giới thiệu VINA TIN DUC - Sản xuất nhựa & bao bì',
      metaDescription: 'Tìm hiểu về VINA TIN DUC - Doanh nghiệp chuyên sản xuất nhựa, bao bì, gia công khuôn mẫu và tái chế tại Việt Nam.',
    },
  });
  if (res?.data?.documentId) await publishEntry('/api/about', res.data.documentId);
  console.log('  ✓ About');
}

// ============================================================
// CONTACT
// ============================================================
async function seedContact() {
  console.log('→ Seeding Contact...');
  const res = await upsertSingle('/api/contact', {
    title: 'Liên hệ với chúng tôi',
    description: 'Hãy liên hệ VINA TIN DUC để được tư vấn và báo giá miễn phí. Chúng tôi luôn sẵn sàng hỗ trợ bạn.',
    contactInfo: {
      phone: '(028) 1234 5678',
      email: 'info@vinatinduc.com',
      address: 'Số 6, Đường DX 013, Khu phố 6, Phường Bình Dương, Thành phố Hồ Chí Minh, Việt Nam',
      workingHours: 'Thứ 2 - Thứ 7: 8:00 - 17:00\nChủ nhật: Nghỉ',
      latitude: 10.8231,
      longitude: 106.6297,
    },
    seo: {
      metaTitle: 'Liên hệ VINA TIN DUC - Tư vấn & Báo giá',
      metaDescription: 'Liên hệ VINA TIN DUC để được tư vấn giải pháp nhựa, bao bì, gia công khuôn mẫu. Báo giá miễn phí.',
    },
  });
  if (res?.data?.documentId) await publishEntry('/api/contact', res.data.documentId);
  console.log('  ✓ Contact');
}

// ============================================================
// PRODUCT CATEGORIES & PRODUCTS
// ============================================================
async function seedProducts() {
  console.log('→ Seeding Product Categories...');
  const categories = [
    { name: 'Bao bì nhựa', slug: 'bao-bi-nhua', description: 'Bao bì nhựa cho ngành thực phẩm, công nghiệp và tiêu dùng.', order: 1 },
    { name: 'Chai & lọ nhựa', slug: 'chai-lo-nhua', description: 'Chai, lọ nhựa PET, HDPE các dung tích.', order: 2 },
    { name: 'Ống hút & dao muỗng', slug: 'ong-hut-dao-muong', description: 'Ống hút, dao muỗng nĩa nhựa và phân hủy sinh học.', order: 3 },
    { name: 'Nguyên liệu nhựa', slug: 'nguyen-lieu-nhua', description: 'Hạt nhựa nguyên sinh và tái chế.', order: 4 },
  ];
  for (const cat of categories) {
    await createEntry('/api/product-categories', cat);
  }
  console.log('  ✓ Product Categories');

  console.log('→ Seeding Products...');
  const products = [
    { name: 'Túi nhựa PE đa năng', slug: 'tui-nhua-pe-da-nang', shortDescription: 'Túi nhựa PE chất lượng cao, đa dạng kích cỡ cho đóng gói thực phẩm và hàng tiêu dùng.', description: '<p>Túi nhựa PE là sản phẩm bao bì thông dụng nhất.</p><h3>Đặc điểm</h3><ul><li>Chất liệu PE nguyên sinh, an toàn thực phẩm</li><li>Đa dạng kích thước</li><li>In ấn logo theo đơn hàng</li><li>Độ bền cao, chống thấm</li></ul>', featured: true, materials: 'PE, LDPE, HDPE', applications: 'Thực phẩm, tiêu dùng, công nghiệp' },
    { name: 'Hộp nhựa PP trong suốt', slug: 'hop-nhua-pp-trong-suot', shortDescription: 'Hộp nhựa PP trong suốt, chịu nhiệt, an toàn thực phẩm cho đóng gói bánh kẹo.', description: '<p>Hộp nhựa PP trong suốt là giải pháp bao bì cao cấp.</p><ul><li>Trong suốt, hiển thị sản phẩm</li><li>Chịu nhiệt đến 120°C</li><li>An toàn thực phẩm</li><li>Có thể tái chế</li></ul>', featured: true, materials: 'PP', applications: 'Bánh kẹo, thực phẩm, mỹ phẩm' },
    { name: 'Chai PET nước giải khát', slug: 'chai-pet-nuoc-giai-khat', shortDescription: 'Chai nhựa PET cho ngành đồ uống, từ 330ml đến 2000ml.', description: '<p>Chai PET phổ biến nhất cho ngành đồ uống.</p><ul><li>Dung tích: 330ml - 2000ml</li><li>PET nguyên sinh</li><li>Cổ chai tiêu chuẩn 28mm, 30mm</li></ul>', featured: true, materials: 'PET, PETG', applications: 'Nước giải khát, nước khoáng' },
    { name: 'Ống hút PLA phân hủy sinh học', slug: 'ong-hut-pla-phan-huy-sinh-hoc', shortDescription: 'Ống hút từ nhựa PLA, thân thiện môi trường, phân hủy sinh học hoàn toàn.', description: '<p>Ống hút PLA từ tinh bột ngô, phân hủy trong 90-180 ngày.</p><ul><li>Phân hủy sinh học hoàn toàn</li><li>Không chứa BPA</li><li>Phù hợp xu hướng xanh</li></ul>', featured: true, materials: 'PLA', applications: 'Nhà hàng, quán cà phê, khách sạn' },
    { name: 'Dây đai nhựa PP', slug: 'day-dai-nhua-pp', shortDescription: 'Dây đai PP đóng kiện hàng hóa, chịu lực tốt.', description: '<p>Dây đai PP cho đóng gói và vận chuyển công nghiệp.</p><ul><li>Rộng: 12-19mm</li><li>Lực kéo đứt: 150-300 kg</li></ul>', featured: false, materials: 'PP', applications: 'Logistics, kho vận, đóng kiện' },
  ];
  for (const product of products) {
    const res = await createEntry('/api/products', product);
    if (res?.data?.documentId) await publishEntry('/api/products', res.data.documentId);
  }
  console.log('  ✓ Products');
}

// ============================================================
// SERVICES
// ============================================================
async function seedServices() {
  console.log('→ Seeding Services...');
  const services = [
    { title: 'Sản xuất sản phẩm nhựa', slug: 'san-xuat-san-pham-nhua', description: 'Sản xuất đa dạng sản phẩm từ nhựa với công nghệ hiện đại.', content: '<p>VINA TIN DUC cung cấp dịch vụ sản xuất nhựa toàn diện.</p><h3>Sản phẩm</h3><ul><li>Bao bì nhựa (túi, hộp, khay)</li><li>Chai lọ PET, HDPE</li><li>Ống hút, dao muỗng nĩa</li><li>Dây đai, ống nhựa</li></ul><h3>Vật liệu</h3><p>PET, PETG, PLA, PP, PS, HDPE, LDPE, PE và nhựa phân hủy sinh học.</p>', featured: true, order: 1, seo: { metaTitle: 'Sản xuất sản phẩm nhựa | VINA TIN DUC' } },
    { title: 'Gia công khuôn mẫu', slug: 'gia-cong-khuon-mau', description: 'Thiết kế và gia công khuôn mẫu chính xác cao.', content: '<p>Gia công khuôn mẫu đáp ứng yêu cầu kỹ thuật khắt khe.</p><h3>Quy trình</h3><ul><li>Thiết kế khuôn 3D</li><li>Gia công CNC chính xác</li><li>Kiểm tra chất lượng</li><li>Chạy thử và hiệu chỉnh</li></ul>', featured: true, order: 2, seo: { metaTitle: 'Gia công khuôn mẫu | VINA TIN DUC' } },
    { title: 'Bao bì & đóng gói', slug: 'bao-bi-dong-goi', description: 'Giải pháp bao bì toàn diện cho thực phẩm, đồ uống và công nghiệp.', content: '<p>Giải pháp bao bì hoàn chỉnh từ thiết kế đến in ấn.</p><ul><li>Túi nhựa PE, PP, OPP</li><li>Hộp nhựa trong suốt</li><li>Khay thực phẩm</li><li>Bao bì phân hủy sinh học</li></ul>', featured: true, order: 3, seo: { metaTitle: 'Bao bì & đóng gói | VINA TIN DUC' } },
    { title: 'Tái chế phế liệu', slug: 'tai-che-phe-lieu', description: 'Thu mua và tái chế phế liệu nhựa, bảo vệ môi trường.', content: '<p>Hoạt động tái chế chuyên nghiệp.</p><ul><li>Thu mua phế liệu nhựa</li><li>Phân loại và xử lý</li><li>Nghiền, rửa, tạo hạt tái sinh</li><li>Cung cấp hạt nhựa tái chế</li></ul>', featured: true, order: 4, seo: { metaTitle: 'Tái chế phế liệu | VINA TIN DUC' } },
    { title: 'Bán buôn vật tư công nghiệp', slug: 'ban-buon-vat-tu', description: 'Cung cấp nguyên liệu nhựa, máy móc, kim loại và vật liệu xây dựng.', content: '<p>Mạng lưới cung cấp vật tư đa dạng.</p><ul><li>Nguyên liệu nhựa nguyên sinh</li><li>Hạt nhựa tái chế</li><li>Máy móc sản xuất</li><li>Kim loại, vật liệu xây dựng</li></ul>', featured: false, order: 5, seo: { metaTitle: 'Bán buôn vật tư | VINA TIN DUC' } },
  ];
  for (const svc of services) {
    const res = await createEntry('/api/services', svc);
    if (res?.data?.documentId) await publishEntry('/api/services', res.data.documentId);
  }
  console.log('  ✓ Services');
}

// ============================================================
// MANUFACTURING PROCESSES
// ============================================================
async function seedProcesses() {
  console.log('→ Seeding Manufacturing Processes...');
  const steps = [
    { title: 'Tiếp nhận yêu cầu', description: 'Tiếp nhận thông tin đơn hàng, tư vấn vật liệu và số lượng phù hợp.', order: 1 },
    { title: 'Thiết kế & Tạo khuôn', description: 'Thiết kế 3D, thẩm định kỹ thuật, gia công khuôn mẫu chính xác.', order: 2 },
    { title: 'Chuẩn bị nguyên liệu', description: 'Lựa chọn và kiểm tra nguyên liệu đầu vào đạt tiêu chuẩn.', order: 3 },
    { title: 'Sản xuất', description: 'Ép phun, thổi, đùn hoặc ép nhiệt theo quy trình tiêu chuẩn.', order: 4 },
    { title: 'Kiểm tra chất lượng', description: 'Kiểm tra 100% sản phẩm về kích thước, độ dày, màu sắc, độ bền.', order: 5 },
    { title: 'In ấn & Hoàn thiện', description: 'In logo, nhãn mác và xử lý bề mặt theo yêu cầu.', order: 6 },
    { title: 'Đóng gói & Giao hàng', description: 'Đóng gói cẩn thận và vận chuyển đúng tiến độ.', order: 7 },
  ];
  for (const step of steps) {
    const res = await createEntry('/api/manufacturing-processes', step);
    if (res?.data?.documentId) await publishEntry('/api/manufacturing-processes', res.data.documentId);
  }
  console.log('  ✓ Manufacturing Processes');
}

// ============================================================
// ARTICLES
// ============================================================
async function seedArticles() {
  console.log('→ Seeding Article Categories...');
  const cats = [
    { name: 'Tin công ty', slug: 'tin-cong-ty' },
    { name: 'Ngành nhựa', slug: 'nganh-nhua' },
    { name: 'Kiến thức', slug: 'kien-thuc' },
  ];
  for (const cat of cats) { await createEntry('/api/article-categories', cat); }
  console.log('  ✓ Article Categories');

  console.log('→ Seeding Articles...');
  const articles = [
    { title: 'VINA TIN DUC chính thức đi vào hoạt động', slug: 'vina-tin-duc-chinh-thuc-hoat-dong', excerpt: 'VINA TIN DUC COMPANY LIMITED chính thức ra mắt thị trường.', content: '<p>VINA TIN DUC COMPANY LIMITED đã chính thức được thành lập và hoạt động tại TP.HCM.</p><p>Với vốn điều lệ 500 triệu đồng và giấy phép đa ngành, công ty tập trung vào sản xuất nhựa, gia công khuôn mẫu, bán buôn và tái chế phế liệu.</p>', author: 'VINA TIN DUC', featured: true },
    { title: 'Xu hướng nhựa phân hủy sinh học 2025', slug: 'xu-huong-nhua-phan-huy-sinh-hoc', excerpt: 'Nhựa phân hủy sinh học đang trở thành xu hướng tất yếu trong ngành bao bì.', content: '<p>Thị trường nhựa phân hủy sinh học tại Việt Nam tăng trưởng mạnh.</p><h3>Yếu tố thúc đẩy</h3><ul><li>Chính sách cấm nhựa dùng một lần</li><li>Nhận thức môi trường</li><li>Yêu cầu xuất khẩu</li></ul><p>VINA TIN DUC đầu tư nghiên cứu sản phẩm nhựa sinh học PLA, PBAT.</p>', author: 'VINA TIN DUC', featured: true },
    { title: 'Phân biệt nhựa PET, PP, HDPE, LDPE', slug: 'phan-biet-nhua-pet-pp-hdpe-ldpe', excerpt: 'Hướng dẫn phân biệt các loại nhựa phổ biến trong sản xuất bao bì.', content: '<h3>PET</h3><p>Trong suốt, nhẹ, chịu áp lực. Dùng cho chai nước.</p><h3>PP</h3><p>Chịu nhiệt cao, dẻo, bền. Dùng cho hộp thực phẩm.</p><h3>HDPE</h3><p>Cứng, chịu hóa chất. Dùng cho can, thùng.</p><h3>LDPE</h3><p>Mềm dẻo, chống ẩm. Dùng cho túi nhựa.</p>', author: 'VINA TIN DUC', featured: false },
  ];
  for (const article of articles) {
    const res = await createEntry('/api/articles', article);
    if (res?.data?.documentId) await publishEntry('/api/articles', res.data.documentId);
  }
  console.log('  ✓ Articles');
}

// ============================================================
// CERTIFICATES
// ============================================================
async function seedCertificates() {
  console.log('→ Seeding Certificates...');
  const res = await createEntry('/api/certificates', {
    title: 'Giấy chứng nhận đăng ký kinh doanh',
    description: 'Giấy chứng nhận đăng ký doanh nghiệp do Sở KH&ĐT cấp.',
    documentType: 'registration',
    issueDate: '2024-01-01',
  });
  if (res?.data?.documentId) await publishEntry('/api/certificates', res.data.documentId);
  console.log('  ✓ Certificates');
}

// ============================================================
// MAIN
// ============================================================
async function main() {
  console.log('🌱 VINA TIN DUC - Seed Script\n');
  await authenticate();
  await seedGlobal();
  await seedHomepage();
  await seedAbout();
  await seedContact();
  await seedProducts();
  await seedServices();
  await seedProcesses();
  await seedArticles();
  await seedCertificates();
  console.log('\n✅ Seed completed! Refresh http://localhost:5173');
}

main().catch((err) => { console.error('Seed failed:', err); process.exit(1); });
