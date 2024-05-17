// Layout.tsx
import { RootState } from '@/redux/reducers';
import React, { ReactNode } from 'react';
import { connect } from 'react-redux';
import './Layout.css'

interface LayoutProps {
  children: ReactNode;
  loading: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main className='main'>{children}</main>
  );
};

const mapStateToProps = (state: RootState) => ({
    loading: state.auth.loading
})

export default connect(mapStateToProps, {
    
    
})(Layout);
