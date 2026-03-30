import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faCheckCircle, faCreditCard, faLock, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import './payment.css';

import LuxeMedia from './LuxeMedia';
interface CartItem {
    id: number;
    uniqueId: string;
    name: string;
    image: string;
    quantity: number;
    size: string;
    basePrice: number;
    totalPrice: number;
    color: string;
}

interface FormData {
    fullName: string;
    country: string;
    city: string;
    address: string;
    phone1: string;
    phone2: string;
    cardNumber: string;
    expiryDate: string;
    cvv: string;
}

const Payment: React.FC = () => {
    const navigate = useNavigate();
    const [isPaid, setIsPaid] = useState<boolean>(false);

    const [cartItems] = useState<CartItem[]>(() => {
        const savedCart = localStorage.getItem('regalia_cart');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const [formData, setFormData] = useState<FormData>({
        fullName: '', country: '', city: '', address: '', phone1: '', phone2: '',
        cardNumber: '', expiryDate: '', cvv: ''
    });

    const [errors, setErrors] = useState<Partial<Record<keyof FormData, boolean>>>({});

    const totalAcquisition = cartItems.reduce((acc, item) => acc + item.totalPrice, 0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        
        let formattedValue = value;
        if (name === 'cardNumber') {
            formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1 ').trim().slice(0, 19);
        }
        if (name === 'expiryDate') {
            formattedValue = value.replace(/\D/g, '').replace(/(.{2})/, '$1/').trim().slice(0, 5);
        }
        if (name === 'cvv') {
            formattedValue = value.replace(/\D/g, '').slice(0, 3);
        }

        setFormData(prev => ({ ...prev, [name]: formattedValue }));
        if (value.trim() !== "") setErrors(prev => ({ ...prev, [name]: false }));
    };

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors: Partial<Record<keyof FormData, boolean>> = {};
        
        (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
            if (!formData[key].trim()) newErrors[key] = true;
        });

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        sessionStorage.setItem('regalia_order_archive', JSON.stringify(formData));
        localStorage.removeItem('regalia_cart');
        setIsPaid(true);
    };

if (cartItems.length === 0 && !isPaid) {
    return (
        <div className="regalia-empty-state-wrapper">
            <div className="void-content-orchestrator">
                
                {/* خلفية الكارت الشفافة كعلامة مائية */}
                <div className="ethereal-card-silhouette">
                    <LuxeMedia src="/created.png" alt="Regalia Card Silhouette" className="silhouette-img" />
                </div>
                
                {/* المحتوى النصي */}
                <div className="void-text-architecture">
                    <span className="void-status-label">STATUS: VACANT</span>
                    <h2 className="void-main-title">THE ARCHIVE IS CURRENTLY SILENT</h2>
                    <p className="void-subtitle">
                        Your curated selection has not been initiated. <br/> 
                        Explore our private collections to begin.
                    </p>
                </div>
                
                {/* زر العودة بتصميم Button Minimalist */}
                <div className="void-action-container">
                    <button className="regalia-return-action" onClick={() => navigate('/collections')}>
                        <span className="action-text">EXPLORE COLLECTIONS</span>
                        <span className="action-line"></span>
                    </button>
                </div>
            </div>
        </div>
    );
}

    if (isPaid) {
        return (
            <div className="payment-success-overlay">
                <div className="success-card">
                    <FontAwesomeIcon icon={faCheckCircle} className="success-icon" />
                    <h1 className="archive-main-title">ACQUISITION COMPLETE</h1>
                    <p className="archive-description">Your selection has been archived and secured under the Regalia protocol.</p>
                    <div className="success-actions">
                        <button className="refresh-btn" onClick={() => window.location.reload()}>
                             <FontAwesomeIcon icon={faRotateRight} /> REFRESH
                        </button>
                        <button className="home-btn" onClick={() => navigate('/')}>RETURN HOME</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className="payment-gateway-wrapper">
            <div className="payment-main-container">
                
                {/* الجانب الأيسر: بيانات الشحن فقط */}
                <div className="payment-left-column">
                    <div className="payment-section">
                        <h2 className="section-title">SHIPPING DESTINATION</h2>
                        <div className="billing-form">
                            <div className="input-group">
                                <input type="text" name="fullName" placeholder="FULL NAME" className={errors.fullName ? 'error-border' : ''} onChange={handleInputChange} />
                                <input type="text" name="country" placeholder="COUNTRY" className={errors.country ? 'error-border' : ''} onChange={handleInputChange} />
                            </div>
                            <input type="text" name="city" placeholder="CITY" className={errors.city ? 'error-border' : ''} onChange={handleInputChange} />
                            <textarea name="address" placeholder="DETAILED ADDRESS" className={errors.address ? 'error-border' : ''} onChange={handleInputChange}></textarea>
                            <div className="input-group">
                                <input type="tel" name="phone1" placeholder="PRIMARY PHONE" className={errors.phone1 ? 'error-border' : ''} onChange={handleInputChange} />
                                <input type="tel" name="phone2" placeholder="SECONDARY PHONE" className={errors.phone2 ? 'error-border' : ''} onChange={handleInputChange} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* الجانب الأيمن: صورة الكارت + بيانات الفيزا + زر الدفع */}
                <div className="payment-card-side">
                    <div className="card-visual-container">
                        <LuxeMedia src="/created.png" alt="Regalia Gold Card" className="gold-card-img" />
                    </div>

                    {/* بيانات الفيزا تحت الكارت مباشرة */}
                    <div className="payment-section" style={{ width: '100%', marginBottom: '30px' }}>
                        <h2 className="section-title" style={{ fontSize: '1rem', marginBottom: '25px' }}>
                            SECURE METHOD <FontAwesomeIcon icon={faLock} style={{ fontSize: '0.7rem', marginLeft: '8px', opacity: 0.5 }} />
                        </h2>
                        <div className="billing-form">
                            <input 
                                type="text" name="cardNumber" placeholder="CARD NUMBER (0000 0000 0000 0000)" 
                                value={formData.cardNumber}
                                className={errors.cardNumber ? 'error-border' : ''} 
                                onChange={handleInputChange} 
                            />
                            <div className="input-group">
                                <input 
                                    type="text" name="expiryDate" placeholder="EXPIRY (MM/YY)" 
                                    value={formData.expiryDate}
                                    className={errors.expiryDate ? 'error-border' : ''} 
                                    onChange={handleInputChange} 
                                />
                                <input 
                                    type="password" name="cvv" placeholder="CVV" 
                                    value={formData.cvv}
                                    className={errors.cvv ? 'error-border' : ''} 
                                    onChange={handleInputChange} 
                                />
                            </div>
                        </div>
                    </div>

                    {/* زر الدفع يحتوي على السعر النهائي */}
                    <button className="pay-now-btn" onClick={handlePayment}>
                        <FontAwesomeIcon icon={faCreditCard} /> PAY ${totalAcquisition.toLocaleString()}
                    </button>
                    
                    <p style={{ textAlign: 'center', fontSize: '0.65rem', marginTop: '20px', opacity: 0.5, letterSpacing: '2px', textTransform: 'uppercase' }}>
                        Protected by Regalia Encryption
                    </p>
                </div>

            </div>
        </section>
    );
};

export default Payment;