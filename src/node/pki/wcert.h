#ifndef PKI_WCERT_H_INCLUDED
#define  PKI_WCERT_H_INCLUDED

#include "../../wrapper/pki/cert.h"

#include <nan.h>
#include "../helper.h"

class WCertificate : public node::ObjectWrap
{
public:
	WCertificate(){};
	~WCertificate(){};

	static void Init(v8::Handle<v8::Object>);
	static NAN_METHOD(New);
	
	//Properties
	static NAN_METHOD(GetSubjectFriendlyName);
	static NAN_METHOD(GetIssuerFriendlyName);
	static NAN_METHOD(GetIssuerName);
	static NAN_METHOD(GetSubjectName);
	static NAN_METHOD(GetNotBefore);
	static NAN_METHOD(GetNotAfter);
	static NAN_METHOD(GetSerialNumber);
	static NAN_METHOD(GetThumbprint);
	static NAN_METHOD(GetVersion);
    static NAN_METHOD(GetType);
	static NAN_METHOD(GetKeyUsage);

	//Methods
	static NAN_METHOD(Load);
	static NAN_METHOD(Import);
	static NAN_METHOD(Save);
	static NAN_METHOD(Export);
	static NAN_METHOD(Compare);
	static NAN_METHOD(Equals);
	static NAN_METHOD(Duplicate);
	static NAN_METHOD(Hash);

	Handle<Certificate> data_;
	
	static inline Nan::Persistent<v8::Function> & constructor() {
		static Nan::Persistent<v8::Function> my_constructor;
		return my_constructor;
	}
};

#endif //PKI_WCERT_H_INCLUDED
