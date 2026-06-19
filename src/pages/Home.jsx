import {Link} from "react-router-dom";

function Home() {
    return (
        <>
        <section className="text-center py-5">
            <div className="container">
                <h1 className="display-4 fw-bold text-success mb-4 hero-title">
                    🍎🥕🥬خضار وفواكه طازجة يومياً
                </h1>

                <p className="lead text-muted mb-5">
                    نوفر افضل المنتجات الطازجة بجودة
                    عالية واسعار مناسبة.
                </p>

                <Link to="/products" className="btn btn-success btn-lg px-4">
                    تسوق الآن
                </Link>
            </div>
        </section>

        <section className="py-5">
            <div className="container">

                <h2 className="text-center mb-5 fw-bold">
                    تصفح اقسامنا
                </h2>

                <div className="row g-4">
                    <div className="col-6 col-md-4">
                        <Link to="/products" className="text-decoration-none">
                            <div className="card border-0 shadow-sm h-100 text-center p-4">
                                <div className="fs-1 mb-3">
                                    🥬
                                </div>

                                <h4 className="fw-bold text-dark">
                                    الخضار
                                </h4>

                                <p className="text-muted">
                                    أفضل الخضار الطازجة يومياً.
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="col-6 col-md-4">
                        <Link to="/products" className="text-decoration-none">
                            <div className="card border-0 shadow-sm h-100 text-center p-4">
                                <div className="fs-1 mb-3">
                                    🍎
                                </div>

                                <h4 className="fw-bold text-dark">
                                    الفواكه
                                </h4>

                                <p className="text-muted">
                                    تشكيلة متنوعة من الفواكه الطازجة.
                                </p>
                            </div>
                        </Link>
                    </div>

                    <div className="col-md-4">
                        <Link to="/products" className="text-decoration-none">
                            <div className="card border-0 shadow-sm h-100 text-center p-4">
                                <div className="fs-1 mb-3">
                                    🔥
                                </div>

                                <h4 className="fw-bold text-dark">
                                    العروض الخاصة
                                </h4>

                                <p className="text-muted">
                                    استفد من افضل العروض والأسعار.
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>
        </section>

        <section className="py-5 bg-light">
            <div className="container">
                <h2 className="text-center mb-5 fw-bold">
                    لماذا تختار الشروق؟
                </h2>

                <div className="row g-4">
                    <div className="col-6 col-md-4">
                        <div className="card border-0 shadow-sm h-100 text-center p-4">
                            <div className="fs-1 mb-3">🌿</div>

                            <h4 className="fw-bold">
                                منتجات طازجة
                            </h4>

                            <p className="text-muted">
                                نختار أفضل الخضار والفواكه يومياً.
                            </p>
                        </div>
                    </div>

                    <div className="col-6 col-md-4">
                        <div className="card border-0 shadow-sm h-100 text-center p-4">
                            <div className="fs-1 mb-3">🚚</div>

                            <h4 className="fw-bold">
                                توصيل سريع
                            </h4>

                            <p className="text-muted">
                                نوصل طلباتك باسرع وقت ممكن.
                            </p>
                        </div>
                    </div>

                    <div className="col-md-4">
                        <div className="card border-0 shadow-sm h-100 text-center p-4">
                            <div className="fs-1 mb-3">💰</div>

                            <h4 className="fw-bold">
                                أسعار مناسبة
                            </h4>

                            <p className="text-muted">
                                أسعار تناسب الجميع.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    );
}

export default Home;