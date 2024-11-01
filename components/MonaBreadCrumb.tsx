import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Fragment } from 'react';

type Props = {
  items: { href?: string; component: React.ReactNode; id: string }[];
};

const MonaBreadCrumb = ({ items }: Props) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, idx) => (
          <Fragment key={item.id}>
            <BreadcrumbItem className="typo-BodySmallMedium text-blackAlpha-50">
              {item.href ? (
                <BreadcrumbLink href={item.href}>
                  {item.component}
                </BreadcrumbLink>
              ) : (
                <span>{item.component}</span>
              )}
            </BreadcrumbItem>
            {idx !== items.length - 1 && (
              <BreadcrumbSeparator className="[&>svg]:stroke-blackAlpha-50" />
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default MonaBreadCrumb;
