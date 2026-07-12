-- Create organization table if it does not exist
CREATE TABLE IF NOT EXISTS organization (
    organization_id SERIAL PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    contact_email VARCHAR(255) NOT NULL,
    logo_filename VARCHAR(255) NOT NULL
);

-- Create service_project table if it does not exist
CREATE TABLE IF NOT EXISTS service_project (
    project_id SERIAL PRIMARY KEY,
    organization_id INT NOT NULL,
    title VARCHAR(150) NOT NULL,
    description TEXT NOT NULL,
    location VARCHAR(255) NOT NULL,
    date VARCHAR(50) NOT NULL,
    CONSTRAINT fk_organization 
        FOREIGN KEY (organization_id) 
        REFERENCES organization(organization_id)
        ON DELETE CASCADE
);

-- Insert sample organizations
INSERT INTO organization (name, description, contact_email, logo_filename)
VALUES
('BrightFuture Builders', 'A nonprofit focused on improving community infrastructure through sustainable construction projects.', 'info@brightfuturebuilders.org', 'brightfuture-logo.png'),
('GreenHarvest Growers', 'An urban farming collective promoting food sustainability and education in local neighborhoods.', 'contact@greenharvest.org', 'greenharvest-logo.png'),
('UnityServe Volunteers', 'A volunteer coordination group supporting local charities and service initiatives.', 'hello@unityserve.org', 'unityserve-logo.png');

-- Insert 15 sample service projects (5 for each organization)
INSERT INTO service_project (organization_id, title, description, location, date)
VALUES
-- Projects for BrightFuture Builders (ID 1)
(1, 'Community Park Renovation', 'Rebuilding the playground and benches in the central park.', 'Central Park, North District', '2026-08-15'),
(1, 'Eco-Friendly Shelter Build', 'Constructing a sustainable storage shed for a local community center.', '123 Main Street', '2026-09-01'),
(1, 'Sidewalk Repair Initiative', 'Repairing damaged sidewalks to improve neighborhood accessibility.', 'Westside Avenue', '2026-09-20'),
(1, 'Solar Lighting Installation', 'Installing solar-powered lights along public pathways.', 'Riverside Trail', '2026-10-05'),
(1, 'Community Garden Gazebo', 'Building a covered seating area for community garden visitors.', 'Greenway Park', '2026-10-18'),

-- Projects for GreenHarvest Growers (ID 2)
(2, 'Urban Orchard Planting', 'Planting 30 fruit trees in the neighborhood vacant lot.', 'Eastside Lot 4B', '2026-08-22'),
(2, 'Composting Workshop & Setup', 'Building community compost bins and teaching residents how to use them.', 'Lincoln High School', '2026-09-10'),
(2, 'Rooftop Garden Setup', 'Installing raised beds and irrigation on the community library roof.', 'Downtown Library', '2026-09-25'),
(2, 'Seed Swap & Soil Prep', 'Preparing winter beds and distributing organic seeds to families.', 'Community Hall Parking Lot', '2026-10-12'),
(2, 'Greenhouse Rehabilitation', 'Repairing the glass and frames of the municipal greenhouse.', 'Botanical Gardens', '2026-11-01'),

-- Projects for UnityServe Volunteers (ID 3)
(3, 'Annual Food Drive Sort', 'Sorting and packing non-perishable food items for local shelters.', 'UnityServe Warehouse', '2026-08-30'),
(3, 'Senior Citizen Tech Support', 'Assisting elderly residents with smartphones, computers, and internet safety.', 'Sunset Retirement Home', '2026-09-15'),
(3, 'Riverbank Cleanup', 'Removing trash and recyclable waste along the city river.', 'City River Front', '2026-09-28'),
(3, 'Winter Coat Distribution', 'Organizing and distributing winter clothing to families in need.', 'St. Mark Community Center', '2026-10-20'),
(3, 'Youth Reading Mentorship', 'Reading with elementary school students and organizing the school library.', 'Oakridge Elementary', '2026-11-05');