import React from "react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface Breadcrumb {
  label: string;
  href?: string | null;
}

interface BreadcrumbHeaderProps {
  breadcrumbs?: Breadcrumb[];
  title: string;
}

const BreadcrumbHeader = ({ breadcrumbs, title }: BreadcrumbHeaderProps) => {
  return (
    <header className="px-4 py-6 border-b border-gray-200 bg-white">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbs?.map((crumb, index) => (
            <React.Fragment key={index}>
              <BreadcrumbItem>
                {crumb.href ? (
                  <BreadcrumbLink href={crumb.href}>{crumb.label}</BreadcrumbLink>
                ) : (
                  <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                )}
                {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            </React.Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-gray-900">{title}</h1>
    </header>
  );
};

export default BreadcrumbHeader;
