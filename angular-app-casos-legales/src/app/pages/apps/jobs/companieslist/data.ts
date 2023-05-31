// Companies List
const companieslist = [
    {
        id: "1",
        image_src: "assets/images/companies/img-33.jpg",
        name: "Martin's Solutions",
        industry_type: "IT Department",
        vacancy: "97",
        company_info: "The IT department of a company ensures that the network of computers within the organisation are well-connected and functioning properly. All the other departments within the company rely on them to ensure that their respective functions can go on seamlessly.",
        location: "Cullera, Spain",
        employee: "250-300",
        rating: "4.8",
        website: "www.martinsolution.com",
        email: "info@martinsolution.com",
        since: "1995"
    }, {
        id: "2",
        image_src: "assets/images/companies/img-4.png",
        name: "Syntyce Solutions",
        industry_type: "Health Services",
        vacancy: "31",
        company_info: "These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents to do what we like best, every pleasure is to be welcomed and every pain avoided, because it is pleasure.",
        location: "San Lorenzo",
        employee: "400-450",
        rating: "4.4",
        website: "www.syntycesolution.com",
        email: "info@syntycesolution.com",
        since: "2001"
    }, {
        id: "3",
        image_src: "assets/images/companies/img-1.jpg",
        name: "Moetic Fashion",
        industry_type: "Textiles: Clothing, Footwear",
        vacancy: "641",
        company_info: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim quia voluptas sit.",
        location: "Cullera, Spain",
        employee: "900-950",
        rating: "4.2",
        website: "-",
        email: "email@moeticfashion.com",
        since: "2000"
    }, {
        id: "4",
        image_src: "assets/images/companies/img-5.png",
        name: "Meta4Systems",
        industry_type: "Computer Industry",
        vacancy: "322",
        company_info: "In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur.",
        location: "Ugashik, US",
        employee: "10-50",
        rating: "4.5",
        website: "www.meta4systems.com",
        email: "support@meta4systems.com",
        since: "2019"
    }, {
        id: "5",
        image_src: "assets/images/companies/img-1.jpg",
        name: "Kent's",
        industry_type: "IT Department",
        vacancy: "10",
        company_info: "A UI/UX designer's job is to create user-friendly interfaces that enable users to understand how to use complex technical. If you're passionate, you'll find great fulfillment in being involved in the design process for the next hot gadget.",
        location: "Zuweihir, UAE",
        employee: "10-50",
        rating: "4.1",
        website: "-",
        email: "-",
        since: "2018"
    }, {
        id: "6",
        image_src: "assets/images/companies/img-7.png",
        name: "Micro Design",
        industry_type: "Financial Services",
        vacancy: "140",
        company_info: "As a Product Designer, you will work within a Product Delivery Team fused with UX, engineering, product and data talent.If several languages coalesce, the grammar of the resulting If several languages coalesce, the grammar of the resulting.",
        location: "Limestone, US",
        employee: "300-350",
        rating: "4.5",
        website: "www.microdesign.com",
        email: "info@microdesign.com",
        since: "2016"
    }, {
        id: "7",
        image_src: "assets/images/companies/img-6.png",
        name: "Zoetic Fashion",
        industry_type: "Textiles: Clothing, Footwear",
        vacancy: "21",
        company_info: "To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages existing.",
        location: "Germany",
        employee: "10-50",
        rating: "3.9",
        website: "-",
        email: "info@zoeticfashion.com",
        since: "2018"
    }, {
        id: "8",
        image_src: "assets/images/companies/img-8.png",
        name: "Digitech Galaxy",
        industry_type: "Telecommunications Services",
        vacancy: "154",
        company_info: "The IT department of a company ensures that the network of computers within the organisation are well-connected and functioning properly. All the other departments within the company rely on them to ensure that their respective functions can go on seamlessly.",
        location: "Zuweihir, UAE",
        employee: "400-415",
        rating: "4.0",
        website: "-",
        email: "-",
        since: "2014"
    }, {
        id: "9",
        image_src: "assets/images/companies/img-9.png",
        name: "Erlebacher's",
        industry_type: "Health Services",
        vacancy: "134",
        company_info: "Their separate existence is a myth. For science, music, sport, etc, Europe uses the same vocabulary. The languages only differ in their grammar, their pronunciation and their most common words. Everyone realizes why a new common language would be desirable.",
        location: "San Lorenzo",
        employee: "350-400",
        rating: "4.4",
        website: "-",
        email: "info@erlebacher.com",
        since: "2016"
    }, {
        id: "10",
        image_src: "assets/images/companies/img-5.png",
        name: "iTest Factory",
        industry_type: "Chemical Industries",
        vacancy: "126",
        company_info: "The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental.",
        location: "Texanna, US",
        employee: "250-300",
        rating: "4.5",
        website: "-",
        email: "info@itest.com",
        since: "2016"
    },
    {
        id: "11",
        image_src: "assets/images/companies/img-7.png",
        name: "Zoetic Fashion",
        industry_type: "Textiles: Clothing, Footwear",
        vacancy: "47",
        company_info: "The IT department of a company ensures that the network of computers within the organisation are well-connected and functioning properly. All the other departments within the company rely on them to ensure that their respective functions can go on seamlessly.",
        location: "Cullera, Spain",
        employee: "120-150",
        rating: "4.7",
        website: "www.zoeticfashion.com",
        email: "info@zoeticfashion.com",
        since: "2015"
    }, {
        id: "12",
        image_src: "assets/images/companies/img-33.jpg",
        name: "Micro Design",
        industry_type: "IT Department",
        vacancy: "23",
        company_info: "Everyone realizes why a new common language would be desirable: one could refuse to pay expensive translators. To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce of the resulting.",
        location: "Zuweihir, UAE",
        employee: "80-100",
        rating: "4.6",
        website: "www.microdesign.com",
        email: "info@microdesign.com",
        since: "2014"
    }, {
        id: "13",
        image_src: "assets/images/companies/img-4.png",
        name: "Syntyce Solutions",
        industry_type: "Computer Industry",
        vacancy: "11",
        company_info: "The IT department of a company ensures that the network of computers within the organisation are well-connected and functioning properly. All the other departments within the company rely on them to ensure that their respective functions can go on seamlessly.",
        location: "Muhtarqah, UAE",
        employee: "50-70",
        rating: "4.2",
        website: "www.syntycesolutions.com",
        email: "support@syntycesolutions.com",
        since: "2016"
    }, {
        id: "14",
        image_src: "assets/images/companies/img-1.jpg",
        name: "Asiatic Solutions",
        industry_type: "Health Services",
        vacancy: "9",
        company_info: "To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is new common language will be more simple and regular than the existing European languages.",
        location: "Pahoa, US",
        employee: "30-50",
        rating: "3.8",
        website: "www.asiaticsolution.com",
        email: "info@asiaticsolution.com",
        since: "2019"
    }, {
        id: "15",
        image_src: "assets/images/companies/img-1.jpg",
        name: "Great Clothes",
        industry_type: "Textiles: Clothing, Footwear",
        vacancy: "60",
        company_info: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit.",
        location: "Phoenix, Arizona",
        employee: "120-150",
        rating: "4.0",
        website: "-",
        email: "-",
        since: "2017"
    }, {
        id: "16",
        image_src: "assets/images/companies/img-5.png",
        name: "Kent's Solutions",
        industry_type: "IT Department",
        vacancy: "26",
        company_info: "It is a paradisematic country, in which roasted parts of sentences fly into your mouth. Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum.",
        location: "Ghurayfah, UAE",
        employee: "50-80",
        rating: "4.2",
        website: "www.kentssolution.com",
        email: "info@kentssolution.com",
        since: "2018"
    }, {
        id: "17",
        image_src: "assets/images/companies/img-4.png",
        name: "Syntyce Solutions",
        industry_type: "Computer Industry",
        vacancy: "11",
        company_info: "The IT department of a company ensures that the network of computers within the organisation are well-connected and functioning properly. All the other departments within the company rely on them to ensure that their respective functions can go on seamlessly.",
        location: "Maidaq, UAE",
        employee: "50-70",
        rating: "4.2",
        website: "www.syntycesolutions.com",
        email: "support@syntycesolutions.com",
        since: "2016"
    }, {
        id: "18",
        image_src: "assets/images/companies/img-4.png",
        name: "Syntyce Solutions",
        industry_type: "Health Services",
        vacancy: "31",
        company_info: "These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents to do what we like best, every pleasure is to be welcomed and every pain avoided, because it is pleasure.",
        location: "Quesada, US",
        employee: "400-450",
        rating: "4.4",
        website: "www.syntycesolution.com",
        email: "info@syntycesolution.com",
        since: "2001"
    }, {
        id: "19",
        image_src: "assets/images/companies/img-5.png",
        name: "iTest Factory",
        industry_type: "Chemical Industries",
        vacancy: "126",
        company_info: "The new common language will be more simple and regular than the existing European languages. It will be as simple as Occidental; in fact, it will be Occidental. it will seem like simplified English, as a skeptical Cambridge friend of mine told me what Occidental.",
        location: "Cullera, Spain",
        employee: "250-300",
        rating: "4.5",
        website: "-",
        email: "info@itest.com",
        since: "2016"
    }, {
        id: "20",
        image_src: "assets/images/companies/img-6.png",
        name: "Zoetic Fashion",
        industry_type: "Textiles: Clothing, Footwear",
        vacancy: "21",
        company_info: "To achieve this, it would be necessary to have uniform grammar, pronunciation and more common words. If several languages coalesce, the grammar of the resulting language is more simple and regular than that of the individual languages existing.",
        location: "Jereirah, UAE",
        employee: "10-50",
        rating: "3.9",
        website: "-",
        email: "info@zoeticfashion.com",
        since: "2018"
    }
]

export { companieslist }